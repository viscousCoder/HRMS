const { getConnection } = require("../database/database");

/**getting all employee list */
async function handleEmployeesList(req, res) {
  try {
    const db = await getConnection();
    const { rows: employeesList } = await db.query(
      "SELECT * FROM employeesdetails JOIN employees_leaves ON employeesdetails.id=employee_id ORDER BY employeesdetails.id ASC"
    );
    res.status(200).json(employeesList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**handle particular employee detail */
async function handleemployeeDetails(req, res) {
  const id = req.header("x-employeeid");
  try {
    const db = await getConnection();
    const { rows: employeeDetail } = await db.query(
      `SELECT * FROM employeesdetails JOIN employees_leaves ON employeesdetails.id=employee_id WHERE employeesdetails.id=$1`,
      [Number(id)]
    );
    res.status(200).json(employeeDetail[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**updating employee Details */
async function handleUpdateEmployeeDeatils(req, res) {
  const {
    employeefirstname,
    employeelastname,
    employeeemail,
    employeephonenumber,
    employeegender,
    employeedesignation,
    manager,
    rep_manager,
    id,
  } = req.body;

  try {
    const db = await getConnection();
    const { rows: employeeDetail } = await db.query(
      `UPDATE employeesdetails SET employeefirstname=$1, employeelastname=$2, employeeemail=$3, employeephonenumber=$4, employeegender=$5, employeedesignation=$6,manager=$7,rep_manager=$8 WHERE id=$9 RETURNING *`,
      [
        employeefirstname,
        employeelastname,
        employeeemail,
        employeephonenumber,
        employeegender,
        employeedesignation,
        manager,
        rep_manager,
        id,
      ]
    );
    res.status(200).json(employeeDetail[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**updating employee leaves Deatils */
async function handleUpdateEmployeeLeaves(req, res) {
  const {
    breavement_leaves,
    casual_leaves,
    earned_leaves,
    maternity_leaves,
    sick_leaves,
    total_leaves,
    id,
  } = req.body;
  // console.log(req.body);
  try {
    const db = await getConnection();
    const { rows: employeeDetail } = await db.query(
      `UPDATE employees_leaves SET  breavement_leaves=$1,
        casual_leaves=$2,
        earned_leaves=$3,
        maternity_leaves=$4,
        sick_leaves=$5,
        total_leaves=$6 WHERE employee_id=$7 RETURNING *`,
      [
        breavement_leaves,
        casual_leaves,
        earned_leaves,
        maternity_leaves,
        sick_leaves,
        total_leaves,
        id,
      ]
    );
    res.status(200).json(employeeDetail[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleReferralList(req, res) {
  try {
    const db = await getConnection();
    const { rows } = await db.query(`
      SELECT * FROM employeesdetails
      Join referral_tables
      on employeesdetails.id=referral_tables.employee_id`);
    // console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    console.log("seomthing went wrong");
  }
}

/**updating the table data like round selected and status */
async function updateReferralCandidate(req, res) {
  try {
    const db = await getConnection();
    const { id, candidate_status, candidate_round, candidate_selected } =
      req.body;

    if (!id) {
      return res.status(400).json({ message: "Candidate ID is required" });
    }

    const { rowCount } = await db.query(
      `UPDATE referral_tables 
       SET 
         candidate_status = COALESCE($1, candidate_status),
         candidate_round = COALESCE($2, candidate_round),
         candidate_selected = COALESCE($3, candidate_selected)
       WHERE id = $4`,
      [candidate_status, candidate_round, candidate_selected, id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res
      .status(200)
      .json({ message: "Candidate updated successfully", data: rowCount });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleReferralAssign(req, res) {
  const { referralId, managerId } = req.body;
  console.log("referid", referralId, "managerId", managerId);

  if (!referralId || !managerId) {
    return res
      .status(400)
      .json({ message: "Referral ID and Manager ID are required." });
  }

  const db = await getConnection();

  try {
    const referralQuery = await db.query(
      "SELECT * FROM referral_tables WHERE id = $1",
      [referralId]
    );
    if (referralQuery.rows.length === 0) {
      return res.status(404).json({ message: "Referral not found." });
    }

    const managerQuery = await db.query(
      "SELECT * FROM employeesdetails WHERE id = $1 AND (employeedesignation = 'Manager' OR employeedesignation = 'Team Lead')",
      [managerId]
    );
    if (managerQuery.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Manager not found or not valid." });
    }

    const insertQuery = `
      INSERT INTO referral_assignments (referral_id, manager_id, status)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const result = await db.query(insertQuery, [
      referralId,
      managerId,
      "ASSIGNED",
    ]);
    const assignmentId = result.rows[0].id;

    res.status(200).json({
      message: "Manager assigned successfully.",
      assignmentId: assignmentId,
      referralId: referralId,
      managerId: managerId,
    });
  } catch (error) {
    console.error("Error assigning manager:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await db.end();
  }
}

//list of assignes manager to that candidate
async function handleGetAssignedManagers(req, res) {
  const { referralId } = req.params;
  // console.log(referralId);

  if (!referralId) {
    return res.status(400).json({ message: "Referral ID is required." });
  }

  const db = await getConnection();

  try {
    const query = `
      SELECT 
        e.id AS manager_id,
        e.employeefirstname,
        e.employeelastname,
        e.employeedesignation,
        ra.status,
        ra.assigned_at
      FROM 
        referral_assignments ra
      JOIN 
        employeesdetails e ON ra.manager_id = e.id
      WHERE 
        ra.referral_id = $1;
    `;
    const result = await db.query(query, [referralId]);

    if (result.rows.length === 0) {
      return res.status(200).json({
        message: "No managers assigned to this referral.",
        assignedManagers: [],
      });
    }

    res.status(200).json({
      message: "Managers assigned to this referral.",
      assignedManagers: result.rows,
    });
  } catch (error) {
    console.error("Error fetching assigned managers:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await db.end();
  }
}

module.exports = {
  handleEmployeesList,
  handleemployeeDetails,
  handleUpdateEmployeeDeatils,
  handleUpdateEmployeeLeaves,
  handleReferralList,
  updateReferralCandidate,
  handleReferralAssign,
  // updateReferralAssignmentStatus,
  handleGetAssignedManagers,
};
