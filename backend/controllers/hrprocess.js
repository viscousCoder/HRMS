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
    id,
  } = req.body;

  try {
    const db = await getConnection();
    const { rows: employeeDetail } = await db.query(
      `UPDATE employeesdetails SET employeefirstname=$1, employeelastname=$2, employeeemail=$3, employeephonenumber=$4, employeegender=$5, employeedesignation=$6,manager=$7 WHERE id=$8 RETURNING *`,
      [
        employeefirstname,
        employeelastname,
        employeeemail,
        employeephonenumber,
        employeegender,
        employeedesignation,
        manager,
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
module.exports = {
  handleEmployeesList,
  handleemployeeDetails,
  handleUpdateEmployeeDeatils,
  handleUpdateEmployeeLeaves,
};
