"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDetails = void 0;
const typeorm_1 = require("typeorm");
const CalendarData_1 = require("./CalendarData");
const ReferralTable_1 = require("./ReferralTable");
// import { ReferralAssignment } from "./ReferralAssignment";
const TodoTable_1 = require("./TodoTable");
const EmployeeLeaves_1 = require("./EmployeeLeaves");
const BlogTable_1 = require("./BlogTable");
const ReferralAssign_1 = require("./ReferralAssign");
let EmployeeDetails = class EmployeeDetails {
};
exports.EmployeeDetails = EmployeeDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "employeefirstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "employeelastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "employeeemail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "employeepassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "employeedesignation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "employeegender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], EmployeeDetails.prototype, "employeephonenumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, default: null }),
    __metadata("design:type", Object)
], EmployeeDetails.prototype, "manager_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true, default: null }),
    __metadata("design:type", Object)
], EmployeeDetails.prototype, "rep_manager", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], EmployeeDetails.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], EmployeeDetails.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CalendarData_1.CalendarData, (calendarData) => calendarData.employee),
    __metadata("design:type", Array)
], EmployeeDetails.prototype, "calendarData", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReferralTable_1.ReferralTable, (referral) => referral.employee),
    __metadata("design:type", Array)
], EmployeeDetails.prototype, "referrals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReferralAssign_1.ReferralAssignment, (assignment) => assignment.manager),
    __metadata("design:type", Array)
], EmployeeDetails.prototype, "referralAssignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TodoTable_1.TodoTable, (todo) => todo.employee),
    __metadata("design:type", Array)
], EmployeeDetails.prototype, "todos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeLeaves_1.EmployeeLeaves, (leave) => leave.employee),
    __metadata("design:type", Array)
], EmployeeDetails.prototype, "leaves", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BlogTable_1.BlogTable, (blog) => blog.employee),
    __metadata("design:type", Array)
], EmployeeDetails.prototype, "blogs", void 0);
exports.EmployeeDetails = EmployeeDetails = __decorate([
    (0, typeorm_1.Entity)("employeesdetails")
], EmployeeDetails);
