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
exports.ReferralAssignment = void 0;
const typeorm_1 = require("typeorm");
const ReferralTable_1 = require("./ReferralTable");
const EmployeeDetails_1 = require("./EmployeeDetails");
let ReferralAssignment = class ReferralAssignment {
};
exports.ReferralAssignment = ReferralAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReferralAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ReferralTable_1.ReferralTable, (referral) => referral.assignments, {
        cascade: true,
        onDelete: "CASCADE",
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "referral_id" }),
    __metadata("design:type", ReferralTable_1.ReferralTable)
], ReferralAssignment.prototype, "referral", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeDetails_1.EmployeeDetails, (manager) => manager.referralAssignments, {
        cascade: true,
        onDelete: "CASCADE",
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "manager_id" }),
    __metadata("design:type", EmployeeDetails_1.EmployeeDetails)
], ReferralAssignment.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, default: "ASSIGNED" }),
    __metadata("design:type", String)
], ReferralAssignment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ReferralAssignment.prototype, "assigned_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ReferralAssignment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], ReferralAssignment.prototype, "updated_at", void 0);
exports.ReferralAssignment = ReferralAssignment = __decorate([
    (0, typeorm_1.Entity)("referral_assignments")
], ReferralAssignment);
