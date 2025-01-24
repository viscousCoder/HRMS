const { getConnection } = require("../database/database");

async function calenderData(req, res) {
  // console.log(req.employee);

  try {
    const db = await getConnection();
    const { rows: data } = await db.query(
      `SELECT calender_data FROM calender_data WHERE employee_id=$1 OR everyone = $2 `,
      [req.employee.employeeid, true]
    );
    // console.log(data);
    if (data.length || data.length == 0) res.status(200).json(data);
  } catch (error) {
    res.json("Internal server Errors");
  }
}

async function handleGetCalenderData(req, res) {
  try {
    const db = await getConnection();
    // console.log(typeof req.body.payload.isEveryone, "hii");
    if (req.body.payload) {
      await db.query(
        `INSERT INTO calender_data(employee_id, calender_data,everyone) VALUES ($1, $2, $3)`,
        [req.employee.employeeid, req.body.payload, req.body.payload.isEveryone]
      );
    }
    res.status(200).json({ message: "Successfully added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { calenderData, handleGetCalenderData };

// const { getConnection } = require("../database/database");

// async function calenderData(req, res) {
//   try {
//     const db = await getConnection();
//     res.send("goos");
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// async function handleGetCalenderData(req, res) {
//   try {
//     const db = await getConnection();
//     console.log(req.employee, "Data");
//     if (req.body.payload) {
//       await db.query(
//         `INSERT INTO calender_data(employee_id, calender_data) VALUES ($1, $2)`,
//         [req.employee.employeeid, JSON.stringify(req.body.payload)]
//       );
//     }
//     res.status(200).json({ message: "Successfully added" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to add" });
//   }
// }

// module.exports = { calenderData, handleGetCalenderData };
