const { getConnection } = require("../database/database");
const { handleGenrateToken } = require("../services/token");
const cloudinary = require("../config/cloudinary");

/**register user */
async function handleUserRegister(req, res) {
  const {
    employeeFirstName,
    employeeLastName,
    employeeEmail,
    employeePassword,
    employeeDesignation,
    employeeGender,
    employeePhoneNumber,
  } = req.body;

  try {
    const db = await getConnection();

    const { rows: existingUsers } = await db.query(
      "SELECT employeeEmail FROM employeesdetails WHERE employeeemail = $1",
      [employeeEmail]
    );
    /**if user exist */
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    /**Adding new user */
    await db.query(
      `
      INSERT INTO employeesdetails 
      (employeeFirstName, employeeLastName, employeeEmail, employeePassword, employeePhoneNumber, employeeGender, employeeDesignation) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        employeeFirstName,
        employeeLastName,
        employeeEmail,
        employeePassword,
        employeePhoneNumber,
        employeeGender,
        employeeDesignation,
      ]
    );
    const { rows: newEmployee } = await db.query(
      "SELECT * FROM employeesdetails WHERE employeeemail = $1",
      [employeeEmail]
    );
    if (createEmployeeLeaveTable(newEmployee[0].id))
      res.status(201).json({ message: "User created successfully" });
    else return res.status(400).json({ error: "Something went wrong" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**employee list table creation */
async function createEmployeeLeaveTable(existingUsers) {
  try {
    const db = await getConnection();
    await db.query(
      `INSERT INTO employees_leaves(employee_id,casual_leaves,earned_leaves,breavement_leaves,sick_leaves,maternity_leaves,total_leaves)
VALUES ($1,10,0,4,4,0,18)`,
      [existingUsers]
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**Signin the user */
async function handleUserSignin(req, res) {
  const { employeeEmail, employeePassword } = req.body;

  try {
    const db = await getConnection();

    const { rows: existingUser } = await db.query(
      `SELECT * FROM employeesdetails WHERE employeeEmail = $1`,
      [employeeEmail]
    );
    if (
      existingUser[0].employeeemail !== employeeEmail ||
      existingUser[0].employeepassword !== employeePassword
    ) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = await handleGenrateToken(existingUser[0]);
    let data = existingUser[0];
    data.token = token;
    res.status(200).json(data);
  } catch (error) {
    console.log("Error during signin", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**getuserdetails */
async function handleGetUserDetails(req, res) {
  const id = req.employee.employeeid;

  try {
    const db = await getConnection();

    const { rows: employeesDetails } = await db.query(
      `SELECT * FROM employeesdetails JOIN employees_leaves ON employeesdetails.id=employees_leaves.employee_id WHERE employeesdetails.id = $1`,
      [id]
    );
    res.status(200).json(employeesDetails[0]);
  } catch (error) {
    console.log("Error during signin", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**update crrurent employee details personal details */
async function handleCurrEmployeePersonalData(req, res) {
  const {
    employeefirstname,
    employeelastname,
    employeeemail,
    employeephonenumber,
    employeegender,
    // employeedesignation,
    // manager,
    // rep_manager,
    id,
  } = req.body;

  try {
    const db = await getConnection();
    const { rows: employeeDetail } = await db.query(
      `UPDATE employeesdetails SET employeefirstname=$1, employeelastname=$2, employeeemail=$3, employeephonenumber=$4, employeegender=$5 WHERE id=$6 RETURNING *`,
      [
        employeefirstname,
        employeelastname,
        employeeemail,
        employeephonenumber,
        employeegender,
        id,
      ]
    );
    res.status(200).json(employeeDetail[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**sending referral */
// async function handleSendReferral(req, res) {
//   console.log("hii", req.body);
//   const { candidate_name, candidate_email } = req.body;
//   const resume_file = req.files.resume_file;
//   if (resume_file) {
//     console.log("hiiii");
//   }
//   console.log(
//     candidate_name,
//     candidate_email,
//     resume_file,
//     req.employee,
//     req.body,
//     "heirieirie"
//   );
//   res.send("hiii");
// }

// Handle File Upload
async function handleSendReferral(req, res) {
  try {
    const db = await getConnection();
    console.log("Received data:", req.body, req.employee);
    const {
      candidate_name,
      candidate_email,
      candidate_contact,
      qualification,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const { rows } = await db.query(
      `INSERT INTO referral_tables(candidate_name,candidate_email,candidate_qualification,candidate_phone_number,candidate_resume,employee_id)
      VALUES($1,$2,$3,$4,$5,$6)`,
      [
        candidate_name,
        candidate_email,
        qualification,
        candidate_contact,
        req.file.path,
        req.employee.employeeid,
      ]
    );

    console.log("File uploaded successfully:", req.file, rows);

    res.json({
      message: "Referral submitted successfully",
      file_url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    console.error("Error handling referral:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Handle File Update (Delete Old & Upload New)
async function handleUpdateReferral(req, res) {
  try {
    console.log("Updating referral:", req.body);
    const { old_public_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "New resume file is required" });
    }

    // Delete Old File
    if (old_public_id) {
      await cloudinary.uploader.destroy(old_public_id);
      console.log("Old file deleted:", old_public_id);
    }

    console.log("New file uploaded:", req.file);

    res.json({
      message: "Referral updated successfully",
      new_file_url: req.file.path, // New file URL
      new_public_id: req.file.filename, // Store for future updates/deletions
    });
  } catch (err) {
    console.error("Error updating referral:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

//assigned the interview
async function getAssignedCandidatesForManager(req, res) {
  const { managerId } = req.params; // Get the manager ID from the URL params

  if (!managerId) {
    return res.status(400).json({ message: "Manager ID is required" });
  }

  try {
    const db = await getConnection();

    // Query to get all candidates assigned to the manager
    const result = await db.query(
      `
      SELECT
      *
      FROM
        referral_tables rt
      JOIN
        referral_assignments ra ON rt.id = ra.referral_id
      JOIN
        employeesdetails ed ON rt.employee_id = ed.id
      WHERE
        ra.manager_id = $1
    `,
      [managerId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No assigned candidates found for this manager" });
    }

    // Send the data as a response
    res.json({
      candidates: result.rows,
    });
  } catch (error) {
    console.error("Error fetching assigned candidates for manager:", error);
    res.status(500).json({ message: "Failed to fetch assigned candidates" });
  }
}

// async function handleUpdateReferralAssign(req, res) {
//   const { referralId, status, managerId } = req.body;

//   if (!referralId || !status || !managerId) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const db = await getConnection();

//     // Update the status of the candidate in the referral table
//     await db.query(
//       `UPDATE referral_tables
//        SET candidate_selected = $1,
//            assigned_manager_id = $2
//        WHERE id = $3`,
//       [status, managerId, referralId]
//     );

//     res.json({ message: "Referral status updated successfully" });
//   } catch (error) {
//     console.error("Error updating referral status:", error);
//     res.status(500).json({ message: "Failed to update referral status" });
//   }
// }

/**updating table */
async function updateReferralAssignmentStatus(req, res) {
  try {
    const db = await getConnection();
    const { id, status } = req.body;
    console.log(status, id);

    if (!id) {
      return res.status(400).json({ message: "Assignment ID is required" });
    }

    const { rowCount } = await db.query(
      `UPDATE referral_assignments
       SET 
         status = COALESCE($1, status)
       WHERE referral_id = $2`,
      [status, id]
    );
    console.log(rowCount);
    if (rowCount === 0) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment status updated successfully",
      data: rowCount,
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {};

module.exports = {
  handleUserRegister,
  handleUserSignin,
  handleGetUserDetails,
  handleCurrEmployeePersonalData,
  handleSendReferral,
  handleUpdateReferral,
  getAssignedCandidatesForManager,
  // handleUpdateReferralAssign,
  updateReferralAssignmentStatus,
};
