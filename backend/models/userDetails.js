/**register table user schema */
// CREATE TABLE employeesdetails(
//     id SERIAL PRIMARY KEY,
//     employeeFirstName VARCHAR(50),
//     employeeLastName VARCHAR(50),
//     employeeEmail VARCHAR(50),
//     employeePassword VARCHAR(50),
//     employeeDesignation VARCHAR(50),
//     employeeGender VARCHAR(10),
//     employeePhoneNumber INTEGER,
// )

/**
 * --INSERT INTO employeesdetails VALUES (1,'Aman','Bihst','amanbisht1010@gmail.com','1234567890','engineer','Male',1234567890)
--INSERT INTO employeesdetails VALUES (1,'Aman','Bihst','amanbisht1010@gmail.com','1234567890','engineer','Male',1234567890)
-- select employeeEmail from employeesdetails
-- where employeeEmail = 'amanbisht1010@gmail.com'

--INSERT INTO employeesdetails (employeeFirstName,employeeLastName,employeeEmail,employeePassword,employeePhoneNumber,employeeGender,employeeDesignation)
--VALUES ('Naman','Bisht','amanbisht10@gmail.com','1234567890',1234567890,'Male','engineer')
 */

//calender data
// CREATE TABLE calender_data(
// id SERIAL PRIMARY KEY,
// employee_id INTEGER REFERENCE employeesdetails(id),
// calenderData VARCHAR()
// );
