import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { CalendarData } from "./CalendarData";
import { ReferralTable } from "./ReferralTable";
// import { ReferralAssignment } from "./ReferralAssignment";
import { TodoTable } from "./TodoTable";
import { EmployeeLeaves } from "./EmployeeLeaves";
import { BlogTable } from "./BlogTable";
import { ReferralAssignment } from "./ReferralAssign";

@Entity("employeesdetails")
export class EmployeeDetails {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  employeefirstname!: string;

  @Column({ type: "varchar", length: 50 })
  employeelastname!: string;

  @Column({ type: "varchar", length: 50 })
  employeeemail!: string;

  @Column({ type: "varchar", length: 50 })
  employeepassword!: string;

  @Column({ type: "varchar", length: 50 })
  employeedesignation!: string;

  @Column({ type: "varchar", length: 10 })
  employeegender!: string;

  @Column({ type: "varchar", length: 10 })
  employeephonenumber!: string;

  @Column({ type: "int", nullable: true, default: null })
  manager_id!: number | null;

  @Column({ type: "varchar", length: 100, nullable: true, default: null })
  rep_manager!: string | null;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  @OneToMany(() => CalendarData, (calendarData) => calendarData.employee)
  calendarData!: CalendarData[];

  @OneToMany(() => ReferralTable, (referral) => referral.employee)
  referrals!: ReferralTable[];

  @OneToMany(() => ReferralAssignment, (assignment) => assignment.manager)
  referralAssignments!: ReferralAssignment[];

  @OneToMany(() => TodoTable, (todo) => todo.employee)
  todos!: TodoTable[];

  @OneToMany(() => EmployeeLeaves, (leave) => leave.employee)
  leaves!: EmployeeLeaves[];

  @OneToMany(() => BlogTable, (blog) => blog.employee)
  blogs!: BlogTable[];
}
