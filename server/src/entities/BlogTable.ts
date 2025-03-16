import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { EmployeeDetails } from "./EmployeeDetails";

@Entity("blog_table")
export class BlogTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => EmployeeDetails, (employee) => employee.blogs, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  employee!: EmployeeDetails;

  @Column({ type: "text" })
  base64_data!: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
