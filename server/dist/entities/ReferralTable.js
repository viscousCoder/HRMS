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
exports.ReferralTable = void 0;
const typeorm_1 = require("typeorm");
const EmployeeDetails_1 = require("./EmployeeDetails");
const ReferralAssign_1 = require("./ReferralAssign");
// import { ReferralAssignment } from "./ReferralAssignment";
let ReferralTable = class ReferralTable {
};
exports.ReferralTable = ReferralTable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReferralTable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], ReferralTable.prototype, "candidate_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], ReferralTable.prototype, "candidate_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], ReferralTable.prototype, "candidate_qualification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20 }),
    __metadata("design:type", String)
], ReferralTable.prototype, "candidate_phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], ReferralTable.prototype, "candidate_resume", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeDetails_1.EmployeeDetails, (employee) => employee.referrals, {
        cascade: true,
        onDelete: "CASCADE",
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "employee_id" }),
    __metadata("design:type", EmployeeDetails_1.EmployeeDetails)
], ReferralTable.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40, default: "PENDING" }),
    __metadata("design:type", String)
], ReferralTable.prototype, "candidate_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], ReferralTable.prototype, "candidate_round", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 30, default: "PENDING" }),
    __metadata("design:type", String)
], ReferralTable.prototype, "candidate_selected", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ReferralTable.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ReferralTable.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReferralAssign_1.ReferralAssignment, (assignment) => assignment.referral),
    __metadata("design:type", Array)
], ReferralTable.prototype, "assignments", void 0);
exports.ReferralTable = ReferralTable = __decorate([
    (0, typeorm_1.Entity)("referral_tables")
], ReferralTable);
