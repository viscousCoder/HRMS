import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReferralTable } from "./ReferralTable";
import { EmployeeDetails } from "./EmployeeDetails";

@Entity("referral_assignments")
export class ReferralAssignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ReferralTable, (referral) => referral.assignments, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "referral_id" })
  referral!: ReferralTable;

  @ManyToOne(() => EmployeeDetails, (manager) => manager.referralAssignments, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "manager_id" })
  manager!: EmployeeDetails;

  @Column({ type: "varchar", length: 20, default: "ASSIGNED" })
  status!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  assigned_at!: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
