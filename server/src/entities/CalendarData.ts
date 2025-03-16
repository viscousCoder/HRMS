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

@Entity("calendar_data")
export class CalendarData {
  @PrimaryGeneratedColumn()
  calendar_id!: number;

  @ManyToOne(() => EmployeeDetails, (employee) => employee.calendarData, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "employee_id" })
  employee!: EmployeeDetails;

  @Column({ type: "jsonb" })
  calendar_data!: any;

  @Column({ type: "boolean", default: false })
  everyone!: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at!: Date;
}

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
