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

@Entity("todo_table")
export class TodoTable {
  @PrimaryGeneratedColumn()
  todo_id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({
    type: "date",
    nullable: false,
    default: () => "CURRENT_DATE",
  })
  due_date!: string;

  @Column({
    type: "varchar",
    length: 40,
    default: "Pending",
    enum: ["Pending", "Progress", "Completed"],
  })
  status!: string;

  @Column({
    type: "varchar",
    length: 30,
    default: "Low",
    enum: ["Low", "Medium", "High"],
  })
  priority!: string;

  @ManyToOne(() => EmployeeDetails, (employee) => employee.todos, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "employee_id" })
  employee!: EmployeeDetails;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}
