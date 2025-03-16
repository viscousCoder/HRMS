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
exports.TodoTable = void 0;
const typeorm_1 = require("typeorm");
const EmployeeDetails_1 = require("./EmployeeDetails");
let TodoTable = class TodoTable {
};
exports.TodoTable = TodoTable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TodoTable.prototype, "todo_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], TodoTable.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], TodoTable.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "date",
        nullable: false,
        default: () => "CURRENT_DATE",
    }),
    __metadata("design:type", String)
], TodoTable.prototype, "due_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 40,
        default: "Pending",
        enum: ["Pending", "Progress", "Completed"],
    }),
    __metadata("design:type", String)
], TodoTable.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 30,
        default: "Low",
        enum: ["Low", "Medium", "High"],
    }),
    __metadata("design:type", String)
], TodoTable.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeDetails_1.EmployeeDetails, (employee) => employee.todos, {
        cascade: true,
        onDelete: "CASCADE",
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "employee_id" }),
    __metadata("design:type", EmployeeDetails_1.EmployeeDetails)
], TodoTable.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], TodoTable.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], TodoTable.prototype, "updated_at", void 0);
exports.TodoTable = TodoTable = __decorate([
    (0, typeorm_1.Entity)("todo_table")
], TodoTable);
