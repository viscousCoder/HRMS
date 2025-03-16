import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { EmployeeDetails } from "./EmployeeDetails";

@Entity("employees_leaves")
export class EmployeeLeaves {
  @PrimaryGeneratedColumn()
  leaves_id!: number;

  @ManyToOne(() => EmployeeDetails, (employee) => employee.leaves, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "employee_id" })
  employee!: EmployeeDetails;

  @Column({ type: "int", default: 0 })
  casual_leaves!: number;

  @Column({ type: "int", default: 0 })
  earned_leaves!: number;

  @Column({ type: "int", default: 0 })
  bereavement_leaves!: number;

  @Column({ type: "int", default: 0 })
  sick_leaves!: number;

  @Column({ type: "int", default: 0 })
  maternity_leaves!: number;

  @Column({ type: "int", default: 0 })
  total_leaves!: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
