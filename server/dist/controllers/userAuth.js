"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserRegister = handleUserRegister;
exports.handleUserSignin = handleUserSignin;
exports.handleGetUserDetails = handleGetUserDetails;
exports.handleCurrEmployeePersonalData = handleCurrEmployeePersonalData;
exports.handleSendReferral = handleSendReferral;
exports.handleUpdateReferral = handleUpdateReferral;
exports.getAssignedCandidatesForManager = getAssignedCandidatesForManager;
exports.updateReferralAssignmentStatus = updateReferralAssignmentStatus;
exports.handleTodoCreation = handleTodoCreation;
exports.handleGetTodoItem = handleGetTodoItem;
exports.handleTodoUpdate = handleTodoUpdate;
exports.handleTodoDelete = handleTodoDelete;
exports.handleAllEmployeeData = handleAllEmployeeData;
exports.handleBlobCreation = handleBlobCreation;
exports.getAllBlobs = getAllBlobs;
const db_config_1 = require("../database/db.config");
const token_1 = require("../services/token");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const EmployeeDetails_1 = require("../entities/EmployeeDetails");
const EmployeeLeaves_1 = require("../entities/EmployeeLeaves");
const BlogTable_1 = require("../entities/BlogTable");
const ReferralTable_1 = require("../entities/ReferralTable");
const ReferralAssign_1 = require("../entities/ReferralAssign");
const TodoTable_1 = require("../entities/TodoTable");
/** Register new user */
function handleUserRegister(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { employeeFirstName, employeeLastName, employeeEmail, employeePassword, employeeDesignation, employeeGender, employeePhoneNumber, } = req.body;
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Check if email already exists
            const existingUser = yield employeeRepository.findOne({
                where: { employeeemail: employeeEmail },
            });
            if (existingUser) {
                res.status(409).json({ error: "Email already exists" });
                return;
            }
            // Create a new employee record
            const newEmployee = employeeRepository.create({
                employeefirstname: employeeFirstName,
                employeelastname: employeeLastName,
                employeeemail: employeeEmail,
                employeepassword: employeePassword,
                employeedesignation: employeeDesignation,
                employeegender: employeeGender,
                employeephonenumber: employeePhoneNumber,
            });
            const savedEmployee = yield employeeRepository.save(newEmployee);
            // Create leave record for the new employee
            if (yield createEmployeeLeaveTable(savedEmployee.id)) {
                res.status(201).json({ message: "User created successfully" });
            }
            else {
                res.status(400).json({ error: "Failed to create leave record" });
            }
        }
        catch (error) {
            console.error("Error during user registration:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Create employee leave record */
function createEmployeeLeaveTable(employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const leaveRepository = AppDataSource.getRepository(EmployeeLeaves_1.EmployeeLeaves);
            // Create default leave record
            const newLeaveRecord = leaveRepository.create({
                employee: { id: employeeId }, // Set employee relation
                casual_leaves: 10,
                earned_leaves: 0,
                bereavement_leaves: 4,
                sick_leaves: 4,
                maternity_leaves: 0,
                total_leaves: 18,
            });
            yield leaveRepository.save(newLeaveRecord);
            return true;
        }
        catch (error) {
            console.error("Error creating leave record:", error);
            return false;
        }
    });
}
/** Sign in user */
function handleUserSignin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { employeeEmail, employeePassword, } = req.body;
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Find the employee by email
            const existingUser = yield employeeRepository.findOne({
                where: { employeeemail: employeeEmail },
            });
            // Handle case where email is not found
            if (!existingUser) {
                res.status(404).json({ error: "No user found, please register" });
                return;
            }
            // Check if user exists and password matches
            if (existingUser.employeepassword !== employeePassword) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }
            // Map EmployeeDetails to Employee interface
            const employee = {
                employeeid: existingUser.id,
                employeefirstname: existingUser.employeefirstname,
                employeelastname: existingUser.employeelastname,
                employeeemail: existingUser.employeeemail,
                employeedesignation: existingUser.employeedesignation,
                employeegender: existingUser.employeegender,
                employeephonenumber: existingUser.employeephonenumber,
            };
            // Generate JWT token
            const token = yield (0, token_1.handleGenerateToken)(employee);
            const userData = {
                id: existingUser.id,
                firstname: existingUser.employeefirstname,
                lastname: existingUser.employeelastname,
                email: existingUser.employeeemail,
                designation: existingUser.employeedesignation,
                token,
            };
            res.status(200).json(userData);
        }
        catch (error) {
            console.error("Error during signin:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Get user details */
function handleGetUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const id = (_a = req.employee) === null || _a === void 0 ? void 0 : _a.employeeid;
        if (!id) {
            res.status(401).json({ error: "Unauthorized: Employee ID missing" });
            return;
        }
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Fetch employee details with leave records
            const employee = yield employeeRepository.findOne({
                where: { id },
                relations: ["leaves"],
            });
            if (!employee) {
                res.status(404).json({ error: "Employee not found" });
            }
            else {
                // res.status(200).json(employee);
                const leaveDetails = ((_b = employee.leaves) === null || _b === void 0 ? void 0 : _b[0]) || {};
                const { leaves } = employee, employeeData = __rest(employee, ["leaves"]);
                const flattenedEmployee = Object.assign(Object.assign({}, employeeData), leaveDetails);
                // Return the flattened object
                res.status(200).json(flattenedEmployee);
            }
        }
        catch (error) {
            console.error("Error getting user details:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Update current employee personal details */
function handleCurrEmployeePersonalData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { employeefirstname, employeelastname, employeeemail, employeephonenumber, employeegender, id, } = req.body;
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Find the existing employee
            const employee = yield employeeRepository.findOne({
                where: { id },
                relations: ["leaves"], // Fetch leaves along with employee data
            });
            if (!employee) {
                res.status(404).json({ error: "Employee not found" });
                return;
            }
            // Update fields
            employee.employeefirstname = employeefirstname;
            employee.employeelastname = employeelastname;
            employee.employeeemail = employeeemail;
            employee.employeephonenumber = employeephonenumber;
            employee.employeegender = employeegender;
            // Save the updated employee
            const updatedEmployee = yield employeeRepository.save(employee);
            // Flatten response (if needed)
            const response = Object.assign(Object.assign({}, updatedEmployee), (_a = updatedEmployee.leaves) === null || _a === void 0 ? void 0 : _a[0]);
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Error updating employee details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
/** Handle referral submission with file upload */
function handleSendReferral(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const referralRepository = AppDataSource.getRepository(ReferralTable_1.ReferralTable);
            console.log("Received data:", req.body, req.employee);
            const { candidate_name, candidate_email, candidate_contact, qualification, } = req.body;
            // Check for required fields
            if (!req.file) {
                res.status(400).json({ error: "Resume file is required" });
                return;
            }
            if (!req.employee || !req.employee.employeeid) {
                res.status(401).json({ error: "Unauthorized: Employee ID missing" });
                return;
            }
            // Create a new referral entry
            const newReferral = referralRepository.create({
                candidate_name,
                candidate_email,
                candidate_phone_number: candidate_contact,
                candidate_qualification: qualification,
                candidate_resume: req.file.path,
                employee: { id: req.employee.employeeid }, // Link to employee
            });
            // Save to the database
            yield referralRepository.save(newReferral);
            console.log("File uploaded successfully:", req.file);
            res.status(201).json({
                message: "Referral submitted successfully",
                file_url: req.file.path,
                public_id: req.file.filename,
                referral: newReferral,
            });
        }
        catch (err) {
            console.error("Error handling referral:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Update referral with file replacement */
// export async function handleUpdateReferral(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const { old_public_id } = req.body;
//     if (!req.file) {
//       res.status(400).json({ error: "New resume file is required" });
//       return;
//     }
//     if (old_public_id) {
//       await cloudinary.uploader.destroy(old_public_id);
//     }
//     res.json({
//       message: "Referral updated successfully",
//       new_file_url: req.file.path,
//       new_public_id: req.file.filename,
//     });
//   } catch (error) {
//     console.error("Error updating referral:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
/** Update referral with file replacement */
function handleUpdateReferral(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { referral_id, old_public_id } = req.body;
            if (!req.file) {
                res.status(400).json({ error: "New resume file is required" });
                return;
            }
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const referralRepository = AppDataSource.getRepository(ReferralTable_1.ReferralTable);
            // Find the existing referral
            const referral = yield referralRepository.findOne({
                where: { id: referral_id },
            });
            if (!referral) {
                res.status(404).json({ error: "Referral not found" });
                return;
            }
            // Delete the old file from Cloudinary (if exists)
            if (old_public_id) {
                yield cloudinary_1.default.uploader.destroy(old_public_id);
            }
            // Update the referral with the new file
            referral.candidate_resume = req.file.path;
            yield referralRepository.save(referral);
            res.json({
                message: "Referral updated successfully",
                new_file_url: req.file.path,
                new_public_id: req.file.filename,
            });
        }
        catch (error) {
            console.error("Error updating referral:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
// /** Get assigned candidates for a manager */
// export async function getAssignedCandidatesForManager(
//   req: Request<{ managerId: string }>,
//   res: Response
// ): Promise<void> {
//   const { managerId } = req.params;
//   if (!managerId) {
//     res.status(400).json({ message: "Manager ID is required" });
//     return;
//   }
//   try {
//     const db = await getConnection();
//     const result = await db.query(
//       `
//       SELECT *
//       FROM referral_tables rt
//       JOIN referral_assignments ra ON rt.id = ra.referral_id
//       JOIN employeesdetails ed ON rt.employee_id = ed.id
//       WHERE ra.manager_id = $1
//     `,
//       [managerId]
//     );
//     if (result.rows.length === 0) {
//       res
//         .status(404)
//         .json({ message: "No assigned candidates found for this manager" });
//       return;
//     }
//     res.status(200).json({ candidates: result.rows });
//   } catch (error) {
//     console.error("Error fetching assigned candidates for manager:", error);
//     res.status(500).json({ message: "Failed to fetch assigned candidates" });
//   }
// }
/** Get assigned candidates for a manager */
function getAssignedCandidatesForManager(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { managerId } = req.params;
        if (!managerId) {
            res.status(400).json({ message: "Manager ID is required" });
            return;
        }
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const assignmentRepository = AppDataSource.getRepository(ReferralAssign_1.ReferralAssignment);
            // Fetch assignments with referral and employee details
            const assignments = yield assignmentRepository.find({
                where: { manager: { id: Number(managerId) } },
                relations: ["referral", "referral.employee"],
            });
            if (assignments.length === 0) {
                res
                    .status(404)
                    .json({ message: "No assigned candidates found for this manager" });
                return;
            }
            // Transform response
            const candidates = assignments.map((assignment) => ({
                referral_id: assignment.referral.id,
                candidate_name: assignment.referral.candidate_name,
                candidate_email: assignment.referral.candidate_email,
                candidate_phone_number: assignment.referral.candidate_phone_number,
                candidate_qualification: assignment.referral.candidate_qualification,
                candidate_resume: assignment.referral.candidate_resume,
                candidate_status: assignment.referral.candidate_status,
                candidate_round: assignment.referral.candidate_round,
                candidate_selected: assignment.referral.candidate_selected,
                referred_by: `${assignment.referral.employee.employeefirstname} ${assignment.referral.employee.employeelastname}`,
                referred_by_email: assignment.referral.employee.employeeemail,
                status: assignment.status,
                assigned_at: assignment.assigned_at,
            }));
            res.status(200).json({ candidates });
        }
        catch (error) {
            console.error("Error fetching assigned candidates for manager:", error);
            res.status(500).json({ message: "Failed to fetch assigned candidates" });
        }
    });
}
// /** Update referral assignment status */
// export async function updateReferralAssignmentStatus(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const db = await getConnection();
//     const { id, status } = req.body;
//     if (!id) {
//       res.status(400).json({ message: "Assignment ID is required" });
//       return;
//     }
//     const { rowCount } = await db.query(
//       `UPDATE referral_assignments
//        SET status = COALESCE($1, status)
//        WHERE referral_id = $2`,
//       [status, id]
//     );
//     if (rowCount === 0) {
//       res.status(404).json({ message: "Assignment not found" });
//       return;
//     }
//     res.status(200).json({
//       message: "Assignment status updated successfully",
//       data: rowCount,
//     });
//   } catch (error) {
//     console.error("Something went wrong:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
/** Update referral assignment status */
function updateReferralAssignmentStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const assignmentRepository = AppDataSource.getRepository(ReferralAssign_1.ReferralAssignment);
            const { id, status } = req.body;
            if (!id) {
                res.status(400).json({ message: "Assignment ID is required" });
                return;
            }
            // Find the assignment
            const assignment = yield assignmentRepository.findOne({
                where: { referral: { id } },
            });
            if (!assignment) {
                res.status(404).json({ message: "Assignment not found" });
                return;
            }
            // Update status if provided
            if (status) {
                assignment.status = status;
                yield assignmentRepository.save(assignment);
            }
            res.status(200).json({
                message: "Assignment status updated successfully",
                updated_status: assignment.status,
            });
        }
        catch (error) {
            console.error("Something went wrong:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
// /** Create a todo list item */
// export async function handleTodoCreation(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     const db = await getConnection();
//     const { title, description, due_date, status, priority } = req.body;
//     if (!req.employee || !req.employee.employeeid) {
//       res.status(401).json({ error: "Unauthorized: Employee ID missing" });
//       return;
//     }
//     const { rows } = await db.query(
//       `
//       INSERT INTO todo_table(title, description, due_date, status, priority, employee_id)
//       VALUES($1, $2, $3, $4, $5, $6) RETURNING *
//       `,
//       [title, description, due_date, status, priority, req.employee.employeeid]
//     );
//     res.status(201).json({
//       message: "Successfully Added",
//       data: rows,
//     });
//   } catch (error) {
//     console.error("Error in todo creation:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
/** Create a todo list item */
function handleTodoCreation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, due_date, status, priority } = req.body;
            if (!req.employee || !req.employee.employeeid) {
                res.status(401).json({ error: "Unauthorized: Employee ID missing" });
                return;
            }
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const todoRepository = AppDataSource.getRepository(TodoTable_1.TodoTable);
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Find the employee by ID
            const employee = yield employeeRepository.findOne({
                where: { id: req.employee.employeeid },
            });
            if (!employee) {
                res.status(404).json({ error: "Employee not found" });
                return;
            }
            // Create the todo item
            const newTodo = todoRepository.create({
                title,
                description,
                due_date,
                status: status || "Pending",
                priority: priority || "Low",
                employee,
            });
            // Save the todo item
            const savedTodo = yield todoRepository.save(newTodo);
            res.status(201).json({
                message: "Successfully Added",
                data: savedTodo,
            });
        }
        catch (error) {
            console.error("Error in todo creation:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
/** Get todo items */
function handleGetTodoItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const employeeId = (_a = req.employee) === null || _a === void 0 ? void 0 : _a.employeeid;
            if (!employeeId) {
                res.status(401).json({ error: "Unauthorized: Employee ID missing" });
                return;
            }
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const todoRepository = AppDataSource.getRepository(TodoTable_1.TodoTable);
            let todos;
            if (req.params.status && req.params.status !== "All") {
                // Fetch todos with specific status
                todos = yield todoRepository.find({
                    where: { employee: { id: employeeId }, status: req.params.status },
                    order: { todo_id: "ASC" },
                });
            }
            else {
                // Fetch all todos for the employee
                todos = yield todoRepository.find({
                    where: { employee: { id: employeeId } },
                    order: { todo_id: "ASC" },
                });
            }
            res.status(200).json(todos);
        }
        catch (error) {
            console.error("Error while fetching todo items:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    });
}
// /** Update a todo item */
// export async function handleTodoUpdate(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     const db = await getConnection();
//     const { id } = req.params;
//     const { title, description, due_date, status, priority } = req.body;
//     const employeeId = req.employee?.employeeid;
//     const { rowCount } = await db.query(
//       `
//       UPDATE todo_table
//       SET title = $1, description = $2, due_date = $3, status = $4, priority = $5
//       WHERE todo_id = $6 AND employee_id = $7
//       `,
//       [title, description, due_date, status, priority, id, employeeId]
//     );
//     if (rowCount === 0) {
//       res.status(404).json({ message: "TODO not found or unauthorized" });
//       return;
//     }
//     res.status(200).json({ message: "Successfully Updated" });
//   } catch (error) {
//     console.error("Error in updating TODO:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
/** Update a todo item */
function handleTodoUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            const { title, description, due_date, status, priority } = req.body;
            const employeeId = (_a = req.employee) === null || _a === void 0 ? void 0 : _a.employeeid;
            if (!employeeId) {
                res.status(401).json({ error: "Unauthorized: Employee ID missing" });
                return;
            }
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const todoRepository = AppDataSource.getRepository(TodoTable_1.TodoTable);
            const todo = yield todoRepository.findOne({
                where: { todo_id: Number(id), employee: { id: employeeId } },
            });
            if (!todo) {
                res.status(404).json({ message: "TODO not found or unauthorized" });
                return;
            }
            // Update the todo item
            todo.title = title || todo.title;
            todo.description = description || todo.description;
            todo.due_date = due_date || todo.due_date;
            todo.status = status || todo.status;
            todo.priority = priority || todo.priority;
            yield todoRepository.save(todo);
            res.status(200).json({ message: "Successfully Updated", data: todo });
        }
        catch (error) {
            console.error("Error in updating TODO:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
// /** Delete a todo item */
// export async function handleTodoDelete(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     const db = await getConnection();
//     const { id } = req.params;
//     const employeeId = req.employee?.employeeid;
//     const { rowCount } = await db.query(
//       `DELETE FROM todo_table WHERE todo_id = $1 AND employee_id = $2`,
//       [id, employeeId]
//     );
//     if (rowCount === 0) {
//       res.status(404).json({ message: "TODO not found or unauthorized" });
//       return;
//     }
//     res.status(200).json({ message: "Successfully Deleted" });
//   } catch (error) {
//     console.error("Error in deleting TODO:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
/** Delete a todo item */
function handleTodoDelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            const employeeId = (_a = req.employee) === null || _a === void 0 ? void 0 : _a.employeeid;
            if (!employeeId) {
                res.status(401).json({ error: "Unauthorized: Employee ID missing" });
                return;
            }
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const todoRepository = AppDataSource.getRepository(TodoTable_1.TodoTable);
            const todo = yield todoRepository.findOne({
                where: { todo_id: Number(id), employee: { id: employeeId } },
            });
            if (!todo) {
                res.status(404).json({ message: "TODO not found or unauthorized" });
                return;
            }
            yield todoRepository.remove(todo);
            res.status(200).json({ message: "Successfully Deleted" });
        }
        catch (error) {
            console.error("Error in deleting TODO:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
// /** Get all employee data */
// export async function handleAllEmployeeData(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   try {
//     const db = await getConnection();
//     const { rows: employeeList } = await db.query(
//       "SELECT * FROM employeesdetails ORDER BY id ASC"
//     );
//     res.status(200).json(employeeList);
//   } catch (error) {
//     console.error("Error fetching employee data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
/** Get all employee data */
function handleAllEmployeeData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            const employeeList = yield employeeRepository.find({
                order: { id: "ASC" },
            });
            res.status(200).json(employeeList);
        }
        catch (error) {
            console.error("Error fetching employee data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
// /** Create a new blob */
// export async function handleBlobCreation(
//   req: AuthenticatedRequest,
//   res: Response
// ): Promise<void> {
//   try {
//     const db = await getConnection();
//     const { base64_data } = req.body;
//     const { employeeid } = req.employee || {};
//     if (!employeeid) {
//       res.status(401).json({ error: "Unauthorized: Employee ID missing" });
//       return;
//     }
//     // Validate Base64 data
//     if (!base64_data || typeof base64_data !== "string") {
//       console.log("Error in base64");
//       res.status(400).json({ error: "Invalid Base64 data" });
//       return;
//     }
//     const { rows } = await db.query(
//       `
//         INSERT INTO blob_table(employee_id, base64_data)
//         VALUES($1, $2)
//         RETURNING id, employee_id, base64_data, created_at, updated_at
//         `,
//       [employeeid, base64_data]
//     );
//     const newBlob: Blob = rows[0];
//     res.status(201).json({
//       message: "Blob successfully added",
//       data: newBlob,
//     });
//   } catch (error) {
//     console.error("Error in blob creation", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
/** Create a new blob */
function handleBlobCreation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const blobRepository = AppDataSource.getRepository(BlogTable_1.BlogTable);
            const { base64_data } = req.body;
            const { employeeid } = req.employee || {};
            if (!employeeid) {
                res.status(401).json({ error: "Unauthorized: Employee ID missing" });
                return;
            }
            // Validate Base64 data
            if (!base64_data || typeof base64_data !== "string") {
                console.log("Error in base64");
                res.status(400).json({ error: "Invalid Base64 data" });
                return;
            }
            const newBlob = blobRepository.create({
                employee: { id: employeeid }, // Link the employee by ID
                base64_data,
            });
            const savedBlob = yield blobRepository.save(newBlob);
            res.status(201).json({
                message: "Blob successfully added",
                data: savedBlob,
            });
        }
        catch (error) {
            console.error("Error in blob creation", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
/** Get all blobs with employee details in ascending order by creation date */
function getAllBlobs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const blogRepository = AppDataSource.getRepository(BlogTable_1.BlogTable);
            // Fetch blobs with employee details, ordered by created_at
            const blobs = yield blogRepository.find({
                relations: ["employee"],
                order: {
                    created_at: "ASC", // Sort by creation date in ascending order
                },
            });
            if (blobs.length === 0) {
                res
                    .status(200)
                    .json({ message: "No blobs found in the table", data: [] });
                return;
            }
            res.status(200).json({
                message: "Blobs and employee details retrieved successfully",
                data: blobs,
            });
        }
        catch (error) {
            console.error("Error fetching blobs with employee details:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
