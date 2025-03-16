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
exports.EmployeeLeaves = void 0;
const typeorm_1 = require("typeorm");
const EmployeeDetails_1 = require("./EmployeeDetails");
let EmployeeLeaves = class EmployeeLeaves {
};
exports.EmployeeLeaves = EmployeeLeaves;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EmployeeLeaves.prototype, "leaves_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeDetails_1.EmployeeDetails, (employee) => employee.leaves, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "employee_id" }),
    __metadata("design:type", EmployeeDetails_1.EmployeeDetails)
], EmployeeLeaves.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], EmployeeLeaves.prototype, "casual_leaves", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], EmployeeLeaves.prototype, "earned_leaves", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], EmployeeLeaves.prototype, "bereavement_leaves", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], EmployeeLeaves.prototype, "sick_leaves", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], EmployeeLeaves.prototype, "maternity_leaves", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], EmployeeLeaves.prototype, "total_leaves", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], EmployeeLeaves.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], EmployeeLeaves.prototype, "updated_at", void 0);
exports.EmployeeLeaves = EmployeeLeaves = __decorate([
    (0, typeorm_1.Entity)("employees_leaves")
], EmployeeLeaves);
