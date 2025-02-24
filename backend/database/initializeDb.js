const { getConnection } = require("./database");

async function initializeDatabase() {
  const db = await getConnection();

  try {
    // Create Users Table
    // await db.query(`
    //   CREATE TABLE IF NOT EXISTS users (
    //     id SERIAL PRIMARY KEY,
    //     name VARCHAR(100) NOT NULL,
    //     username VARCHAR(100) UNIQUE NOT NULL,
    //     email VARCHAR(255) UNIQUE NOT NULL,
    //     phone VARCHAR(20),
    //     website VARCHAR(255)
    //   )
    // `);

    // // Create Todos Table
    // await db.query(`
    //   CREATE TABLE IF NOT EXISTS todos (
    //     id SERIAL PRIMARY KEY,
    //     title VARCHAR(255) NOT NULL,
    //     completed BOOLEAN DEFAULT FALSE,
    //     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    //   )
    // `);

    //create refral table
    await db.query(`
        CREATE TABLE IF NOT EXISTS referral_tables(
        id SERIAL PRIMARY KEY,
        candidate_name VARCHAR(100),
        candidate_email VARCHAR(100),
        candidate_qualification VARCHAR(50),
        candidate_phone_number VARCHAR(20),
        candidate_resume VARCHAR(100),
        employee_id INTEGER REFERENCES employeesdetails(id),
        candidate_status VARCHAR(40) DEFAULT 'PENDING',
        candidate_round INTEGER DEFAULT 0,
        candidate_selected VARCHAR(30) DEFAULT 'PENDING'
        )`);

    await db.query(`CREATE TABLE IF NOT EXISTS referral_assignments (
    id SERIAL PRIMARY KEY,
    referral_id INTEGER REFERENCES referral_tables(id) ON DELETE CASCADE,
    manager_id INTEGER REFERENCES employeesdetails(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'ASSIGNED', 
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw new Error(error);
  } finally {
    await db.end(); // Close the connection after setup
  }
}

module.exports = { initializeDatabase };
