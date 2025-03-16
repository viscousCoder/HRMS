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
      `INSERT INTO employees_leaves(employee_id,casual_leaves,earned_leaves,bereavement_leaves,sick_leaves,maternity_leaves,total_leaves)
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

/**Todo section */

/**created todo list item */

async function handleTodoCreation(req, res) {
  try {
    // console.log(req.body, req.employee);
    const db = await getConnection();
    const { title, description, due_date, status, priority } = req.body;
    const { rows } = await db.query(
      `
      INSERT INTO todo_table(title,description,due_date,status,priority,employee_id)
      VALUES($1,$2,$3,$4,$5,$6)
      `,
      [title, description, due_date, status, priority, req.employee.employeeid]
    );
    res.status(201).json({
      message: "Successfull Added",
      data: rows,
    });
  } catch (error) {
    console.log(error, "Error in todod");
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**geting todo item */
async function handleGetTodoItem(req, res) {
  try {
    const db = await getConnection();
    const { status } = req.params;
    const employeeId = req.employee.employeeid;

    const query =
      status && status !== "All"
        ? "SELECT todo_id, title, description, TO_CHAR(due_date, 'YYYY-MM-DD') AS due_date, status, priority FROM todo_table WHERE employee_id = $1 AND status = $2"
        : "SELECT todo_id, title, description, TO_CHAR(due_date, 'YYYY-MM-DD') AS due_date, status, priority FROM todo_table WHERE employee_id = $1";

    const values =
      status && status !== "All" ? [employeeId, status] : [employeeId];

    const { rows } = await db.query(query, values);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error while fetching todo items:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

/**updating todo item */
async function handleTodoUpdate(req, res) {
  try {
    const db = await getConnection();
    const { id } = req.params;
    const { title, description, due_date, status, priority } = req.body;
    const employeeId = req.employee.employeeid;

    const { rowCount } = await db.query(
      `
      UPDATE todo_table
      SET title = $1, description = $2, due_date = $3, status = $4, priority = $5
      WHERE todo_id = $6 AND employee_id = $7
      `,
      [title, description, due_date, status, priority, id, employeeId]
    );

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ message: "TODO not found or unauthorized" });
    }

    res.status(200).json({
      message: "Successfully Updated",
    });
  } catch (error) {
    console.log(error, "Error in updating TODO");
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**deleting todo */
async function handleTodoDelete(req, res) {
  try {
    const db = await getConnection();
    const { id } = req.params;
    const employeeId = req.employee.employeeid;

    const { rowCount } = await db.query(
      `
      DELETE FROM todo_table
      WHERE todo_id = $1 AND employee_id = $2
      `,
      [id, employeeId]
    );

    if (rowCount === 0) {
      return res
        .status(404)
        .json({ message: "TODO not found or unauthorized" });
    }

    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.log(error, "Error in deleting TODO");
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**getting all employee list */
async function handleAllEmployeeData(req, res) {
  try {
    const db = await getConnection();
    const { rows: employeeList } = await db.query(
      "SELECT * FROM employeesdetails ORDER BY id ASC"
    );
    res.status(200).json(employeeList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**BLOG Section */
/**creating blob */
// async function handleBlobCreation(req, res) {
//   try {
//     const db = await getConnection();
//     console.log(base64_data, "Data");
//     const { blob_url } = req.body;
//     const { employeeid } = req.employee;

//     const { rows } = await db.query(
//       `
//       INSERT INTO blob_table(employee_id, blob_url)
//       VALUES($1, $2)
//       RETURNING id, employee_id, blob_url, created_at, updated_at
//       `,
//       [employeeid, blob_url]
//     );
//     console.log(rows[0], "here", rows);
//     res.status(201).json({
//       message: "Blob successfully added",
//       data: rows[0],
//     });
//   } catch (error) {
//     console.error("Error in blob creation", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
async function handleBlobCreation(req, res) {
  try {
    const db = await getConnection();

    const { base64_data } = req.body;
    const { employeeid } = req.employee;

    // Ensure that the Base64 data is valid
    if (!base64_data || typeof base64_data !== "string") {
      console.log("Error in base64");
      return res.status(400).json({ error: "Invalid Base64 data" });
    }

    const { rows } = await db.query(
      `
      INSERT INTO blob_table(employee_id, base64_data)
      VALUES($1, $2)
      RETURNING id, employee_id, base64_data, created_at, updated_at
      `,
      [employeeid, base64_data] // Insert Base64 data instead of blob_url
    );

    // console.log(rows[0], "here", rows);

    res.status(201).json({
      message: "Blob successfully added",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error in blob creation", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**geting all blogs */
// async function getAllBlobs(req, res) {
//   try {
//     const db = await getConnection();

//     const { rows } = await db.query(`SELECT * FROM blob_table`);

//     if (rows.length === 0) {
//       return res.status(404).json({
//         message: "No blobs found in the table",
//       });
//     }
//     console.log(rows, "getting");
//     res.status(200).json({
//       message: "Blobs retrieved successfully",
//       data: rows,
//     });
//   } catch (error) {
//     console.error("Error fetching blobs", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
/** Getting all blobs with all employee details */
async function getAllBlobs(req, res) {
  try {
    const db = await getConnection();

    // Select all columns from both tables using *
    const { rows } = await db.query(`
      SELECT 
        bt.*,  -- All columns from blob_table
        ed.*   -- All columns from employeesdetails
      FROM blob_table bt
      LEFT JOIN employeesdetails ed ON bt.employee_id = ed.id
    `);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "No blobs found in the table",
      });
    }

    // console.log(rows, "Retrieved blobs with all employee details");
    res.status(200).json({
      message: "Blobs and all employee details retrieved successfully",
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching blobs with all employee details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

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
  handleTodoCreation,
  handleGetTodoItem,
  handleTodoUpdate,
  handleTodoDelete,
  handleAllEmployeeData,
  handleBlobCreation,
  getAllBlobs,
};
