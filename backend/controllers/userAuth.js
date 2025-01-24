const { getConnection } = require("../database/database");
const { handleGenrateToken } = require("../services/token");
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
    res.status(200).json(employeesDetails);
  } catch (error) {
    console.log("Error during signin", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleUserRegister,
  handleUserSignin,
  handleGetUserDetails,
};
