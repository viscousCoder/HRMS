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
exports.CalendarData = void 0;
const typeorm_1 = require("typeorm");
const EmployeeDetails_1 = require("./EmployeeDetails");
let CalendarData = class CalendarData {
};
exports.CalendarData = CalendarData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CalendarData.prototype, "calendar_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeDetails_1.EmployeeDetails, (employee) => employee.calendarData, {
        cascade: true,
        onDelete: "CASCADE",
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "employee_id" }),
    __metadata("design:type", EmployeeDetails_1.EmployeeDetails)
], CalendarData.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb" }),
    __metadata("design:type", Object)
], CalendarData.prototype, "calendar_data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], CalendarData.prototype, "everyone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], CalendarData.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], CalendarData.prototype, "updated_at", void 0);
exports.CalendarData = CalendarData = __decorate([
    (0, typeorm_1.Entity)("calendar_data")
], CalendarData);
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
// } from "typeorm";
// import { EmployeeDetails } from "./EmployeeDetails";
// @Entity("calendar_data")
// export class CalendarData {
//   @PrimaryGeneratedColumn()
//   calendar_id!: number;
//   @ManyToOne(() => EmployeeDetails, {
//     cascade: true,
//     onDelete: "CASCADE",
//     eager: true,
//   })
//   @JoinColumn({ name: "employee_id" })
//   employee!: EmployeeDetails;
//   @Column({ type: "text" })
//   calendar_data!: string;
//   @Column({ type: "boolean", default: false })
//   everyone!: boolean;
// }
