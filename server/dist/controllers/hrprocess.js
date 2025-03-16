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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmployeesList = handleEmployeesList;
exports.handleEmployeeDetails = handleEmployeeDetails;
exports.handleUpdateEmployeeDetails = handleUpdateEmployeeDetails;
exports.handleUpdateEmployeeLeaves = handleUpdateEmployeeLeaves;
exports.handleReferralList = handleReferralList;
exports.updateReferralCandidate = updateReferralCandidate;
exports.handleReferralAssign = handleReferralAssign;
exports.handleGetAssignedManagers = handleGetAssignedManagers;
const db_config_1 = require("../database/db.config");
const ReferralTable_1 = require("../entities/ReferralTable");
const EmployeeDetails_1 = require("../entities/EmployeeDetails");
const ReferralAssign_1 = require("../entities/ReferralAssign");
const typeorm_1 = require("typeorm");
const EmployeeLeaves_1 = require("../entities/EmployeeLeaves");
/** Get all employees list */
function handleEmployeesList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Fetch employees with their leaves
            const employeesList = yield employeeRepository.find({
                relations: ["leaves"],
                order: { id: "ASC" },
            });
            res.status(200).json(employeesList);
        }
        catch (error) {
            console.error("Error fetching employee list:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Get details of a specific employee */
function handleEmployeeDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const id = req.header("x-employeeid");
        if (!id) {
            res.status(400).json({ message: "Employee ID is required" });
            return;
        }
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Find the employee with their leaves
            const employeeDetail = yield employeeRepository.findOne({
                where: { id: Number(id) },
                relations: ["leaves"], // Load leaves relation
            });
            if (employeeDetail) {
                // res.status(200).json(employeeDetail);
                const leaveDetails = ((_a = employeeDetail.leaves) === null || _a === void 0 ? void 0 : _a[0]) || {};
                const { leaves } = employeeDetail, employeeData = __rest(employeeDetail, ["leaves"]);
                const flattenedEmployee = Object.assign(Object.assign({}, employeeData), leaveDetails);
                // Return the flattened object
                res.status(200).json(flattenedEmployee);
            }
            else {
                res.status(404).json({ message: "Employee not found" });
            }
        }
        catch (error) {
            console.error("Error fetching employee details:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Update employee details */
function handleUpdateEmployeeDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { employeefirstname, employeelastname, employeeemail, employeephonenumber, employeegender, employeedesignation, manager_id, rep_manager, id, } = req.body;
        if (!id) {
            res.status(400).json({ message: "Employee ID is required" });
            return;
        }
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            const employee = yield employeeRepository.findOneBy({ id });
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
                return;
            }
            // Update employee fields
            employee.employeefirstname =
                employeefirstname !== null && employeefirstname !== void 0 ? employeefirstname : employee.employeefirstname;
            employee.employeelastname = employeelastname !== null && employeelastname !== void 0 ? employeelastname : employee.employeelastname;
            employee.employeeemail = employeeemail !== null && employeeemail !== void 0 ? employeeemail : employee.employeeemail;
            employee.employeephonenumber =
                employeephonenumber !== null && employeephonenumber !== void 0 ? employeephonenumber : employee.employeephonenumber;
            employee.employeegender = employeegender !== null && employeegender !== void 0 ? employeegender : employee.employeegender;
            employee.employeedesignation =
                employeedesignation !== null && employeedesignation !== void 0 ? employeedesignation : employee.employeedesignation;
            employee.manager_id = manager_id !== null && manager_id !== void 0 ? manager_id : employee.manager_id;
            employee.rep_manager = rep_manager !== null && rep_manager !== void 0 ? rep_manager : employee.rep_manager;
            const updatedEmployee = yield employeeRepository.save(employee);
            res.status(200).json(updatedEmployee);
        }
        catch (error) {
            console.error("Error updating employee details:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Update employee leave details */
function handleUpdateEmployeeLeaves(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bereavement_leaves, casual_leaves, earned_leaves, maternity_leaves, sick_leaves, total_leaves, id, } = req.body;
        if (!id) {
            res.status(400).json({ message: "Employee ID is required" });
            return;
        }
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const leaveRepository = AppDataSource.getRepository(EmployeeLeaves_1.EmployeeLeaves);
            const employeeRepository = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            // Check if the employee exists
            const employee = yield employeeRepository.findOne({
                where: { id },
                relations: ["leaves"],
            });
            if (!employee) {
                res.status(404).json({ message: "Employee not found" });
                return;
            }
            // Check if leave entry exists, or create a new one
            let leaveDetails = yield leaveRepository.findOne({
                where: { employee: { id } },
            });
            if (!leaveDetails) {
                leaveDetails = leaveRepository.create({ employee });
            }
            // Update leave details
            leaveDetails.bereavement_leaves =
                bereavement_leaves !== null && bereavement_leaves !== void 0 ? bereavement_leaves : leaveDetails.bereavement_leaves;
            leaveDetails.casual_leaves = casual_leaves !== null && casual_leaves !== void 0 ? casual_leaves : leaveDetails.casual_leaves;
            leaveDetails.earned_leaves = earned_leaves !== null && earned_leaves !== void 0 ? earned_leaves : leaveDetails.earned_leaves;
            leaveDetails.maternity_leaves =
                maternity_leaves !== null && maternity_leaves !== void 0 ? maternity_leaves : leaveDetails.maternity_leaves;
            leaveDetails.sick_leaves = sick_leaves !== null && sick_leaves !== void 0 ? sick_leaves : leaveDetails.sick_leaves;
            leaveDetails.total_leaves = total_leaves !== null && total_leaves !== void 0 ? total_leaves : leaveDetails.total_leaves;
            const updatedLeaves = yield leaveRepository.save(leaveDetails);
            res.status(200).json(updatedLeaves);
        }
        catch (error) {
            console.error("Error updating employee leaves:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
/** Get referral list with flattened employee details */
function handleReferralList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const referralRepository = AppDataSource.getRepository(ReferralTable_1.ReferralTable);
            // Fetch referrals with employee details
            const referrals = yield referralRepository.find({
                relations: ["employee"],
            });
            // Flatten the result to exclude unnecessary employee details
            const formattedReferrals = referrals.map((referral) => {
                var _a, _b, _c;
                return ({
                    id: referral.id,
                    candidate_name: referral.candidate_name,
                    candidate_email: referral.candidate_email,
                    candidate_qualification: referral.candidate_qualification,
                    candidate_phone_number: referral.candidate_phone_number,
                    candidate_resume: referral.candidate_resume,
                    candidate_status: referral.candidate_status,
                    candidate_round: referral.candidate_round,
                    candidate_selected: referral.candidate_selected,
                    created_at: referral.created_at,
                    updated_at: referral.updated_at,
                    // Flattened employee details
                    employeefirstname: (_a = referral.employee) === null || _a === void 0 ? void 0 : _a.employeefirstname,
                    employeelastname: (_b = referral.employee) === null || _b === void 0 ? void 0 : _b.employeelastname,
                    employeeemail: (_c = referral.employee) === null || _c === void 0 ? void 0 : _c.employeeemail,
                });
            });
            res.status(200).json(formattedReferrals);
        }
        catch (error) {
            console.error("Error fetching referral list:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
/** Update referral candidate details */
function updateReferralCandidate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const referralRepository = AppDataSource.getRepository(ReferralTable_1.ReferralTable);
            const { id, candidate_status, candidate_round, candidate_selected } = req.body;
            if (!id) {
                res.status(400).json({ message: "Candidate ID is required" });
                return;
            }
            // Find the candidate
            const candidate = yield referralRepository.findOne({ where: { id } });
            if (!candidate) {
                res.status(404).json({ message: "Candidate not found" });
                return;
            }
            // Update fields if provided
            candidate.candidate_status = candidate_status !== null && candidate_status !== void 0 ? candidate_status : candidate.candidate_status;
            candidate.candidate_round = candidate_round !== null && candidate_round !== void 0 ? candidate_round : candidate.candidate_round;
            candidate.candidate_selected =
                candidate_selected !== null && candidate_selected !== void 0 ? candidate_selected : candidate.candidate_selected;
            yield referralRepository.save(candidate);
            res.status(200).json({ message: "Candidate updated successfully" });
        }
        catch (error) {
            console.error("Error updating referral candidate:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
/** Assign referral to a manager */
function handleReferralAssign(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { referralId, managerId } = req.body;
        if (!referralId || !managerId) {
            res
                .status(400)
                .json({ message: "Referral ID and Manager ID are required." });
            return;
        }
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const referralRepo = AppDataSource.getRepository(ReferralTable_1.ReferralTable);
            const employeeRepo = AppDataSource.getRepository(EmployeeDetails_1.EmployeeDetails);
            const assignmentRepo = AppDataSource.getRepository(ReferralAssign_1.ReferralAssignment);
            // Check if the referral exists
            const referral = yield referralRepo.findOne({ where: { id: referralId } });
            if (!referral) {
                res.status(404).json({ message: "Referral not found." });
                return;
            }
            // Check if the manager exists and has a valid designation
            const manager = yield employeeRepo.findOne({
                where: {
                    id: managerId,
                    employeedesignation: (0, typeorm_1.In)(["manager", "team lead"]),
                },
            });
            if (!manager) {
                res.status(404).json({ message: "Manager not found or not valid." });
                return;
            }
            // Create a new referral assignment
            const assignment = assignmentRepo.create({
                referral,
                manager,
                status: "ASSIGNED",
            });
            const savedAssignment = yield assignmentRepo.save(assignment);
            res.status(200).json({
                message: "Manager assigned successfully.",
                assignmentId: savedAssignment.id,
            });
        }
        catch (error) {
            console.error("Error assigning manager:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
/** Get assigned managers */
function handleGetAssignedManagers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const referralId = parseInt(req.params.referralId, 10);
        if (isNaN(referralId)) {
            res.status(400).json({ message: "Invalid referral ID" });
            return;
        }
        try {
            const AppDataSource = yield (0, db_config_1.getConnection)();
            const assignmentRepo = AppDataSource.getRepository(ReferralAssign_1.ReferralAssignment);
            const assignments = yield assignmentRepo.find({
                where: { referral: { id: referralId } },
                relations: ["manager"],
                select: {
                    manager: {
                        id: true,
                        employeefirstname: true,
                        employeelastname: true,
                        employeedesignation: true,
                    },
                    status: true,
                },
            });
            if (assignments.length === 0) {
                res
                    .status(200)
                    .json({ message: "No managers assigned to this referral." });
                return;
            }
            const formattedResult = assignments.map((assignment) => ({
                id: assignment.manager.id,
                employeefirstname: assignment.manager.employeefirstname,
                employeelastname: assignment.manager.employeelastname,
                employeedesignation: assignment.manager.employeedesignation,
                status: assignment.status,
            }));
            res.status(200).json(formattedResult);
        }
        catch (error) {
            console.error("Error fetching managers:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
