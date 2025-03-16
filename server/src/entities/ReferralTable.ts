import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { EmployeeDetails } from "./EmployeeDetails";
import { ReferralAssignment } from "./ReferralAssign";
// import { ReferralAssignment } from "./ReferralAssignment";

@Entity("referral_tables")
export class ReferralTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  candidate_name!: string;

  @Column({ type: "varchar", length: 100 })
  candidate_email!: string;

  @Column({ type: "varchar", length: 50 })
  candidate_qualification!: string;

  @Column({ type: "varchar", length: 20 })
  candidate_phone_number!: string;

  @Column({ type: "varchar", length: 100 })
  candidate_resume!: string;

  @ManyToOne(() => EmployeeDetails, (employee) => employee.referrals, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "employee_id" })
  employee!: EmployeeDetails;

  @Column({ type: "varchar", length: 40, default: "PENDING" })
  candidate_status!: string;

  @Column({ type: "int", default: 0 })
  candidate_round!: number;

  @Column({ type: "varchar", length: 30, default: "PENDING" })
  candidate_selected!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;

  @OneToMany(() => ReferralAssignment, (assignment) => assignment.referral)
  assignments!: ReferralAssignment[];
}
