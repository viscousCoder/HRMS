import { Request, Response } from "express";
import { getConnection } from "../database/db.config";
import { ReferralTable } from "../entities/ReferralTable";
import { EmployeeDetails } from "../entities/EmployeeDetails";
import { ReferralAssignment } from "../entities/ReferralAssign";
import { In } from "typeorm";
import { EmployeeLeaves } from "../entities/EmployeeLeaves";

/** Employee details interface */
interface Employee {
  id: number;
  employeefirstname: string;
  employeelastname: string;
  employeeemail: string;
  employeephonenumber: string;
  employeegender: string;
  employeedesignation: string;
  manager: string;
  rep_manager: string;
}

/** Leave details interface */
interface LeaveDetails {
  breavement_leaves: number;
  casual_leaves: number;
  earned_leaves: number;
  maternity_leaves: number;
  sick_leaves: number;
  total_leaves: number;
}

/** Referral details interface */
interface Referral {
  id: number;
  candidate_status: string;
  candidate_round: string;
  candidate_selected: boolean;
}

/** Get all employees list */
export async function handleEmployeesList(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const AppDataSource = await getConnection();
    const employeeRepository = AppDataSource.getRepository(EmployeeDetails);

    // Fetch employees with their leaves
    const employeesList = await employeeRepository.find({
      relations: ["leaves"],
      order: { id: "ASC" },
    });

    res.status(200).json(employeesList);
  } catch (error) {
    console.error("Error fetching employee list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/** Get details of a specific employee */
export async function handleEmployeeDetails(
  req: Request,
  res: Response
): Promise<void> {
  const id = req.header("x-employeeid");
  if (!id) {
    res.status(400).json({ message: "Employee ID is required" });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const employeeRepository = AppDataSource.getRepository(EmployeeDetails);

    // Find the employee with their leaves
    const employeeDetail = await employeeRepository.findOne({
      where: { id: Number(id) },
      relations: ["leaves"], // Load leaves relation
    });

    if (employeeDetail) {
      // res.status(200).json(employeeDetail);
      const leaveDetails = employeeDetail.leaves?.[0] || {};
      const { leaves, ...employeeData } = employeeDetail;
      const flattenedEmployee = {
        ...employeeData,
        ...leaveDetails,
      };

      // Return the flattened object
      res.status(200).json(flattenedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/** Update employee details */
export async function handleUpdateEmployeeDetails(
  req: Request,
  res: Response
): Promise<void> {
  const {
    employeefirstname,
    employeelastname,
    employeeemail,
    employeephonenumber,
    employeegender,
    employeedesignation,
    manager_id,
    rep_manager,
    id,
  } = req.body;

  if (!id) {
    res.status(400).json({ message: "Employee ID is required" });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const employeeRepository = AppDataSource.getRepository(EmployeeDetails);

    const employee = await employeeRepository.findOneBy({ id });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Update employee fields
    employee.employeefirstname =
      employeefirstname ?? employee.employeefirstname;
    employee.employeelastname = employeelastname ?? employee.employeelastname;
    employee.employeeemail = employeeemail ?? employee.employeeemail;
    employee.employeephonenumber =
      employeephonenumber ?? employee.employeephonenumber;
    employee.employeegender = employeegender ?? employee.employeegender;
    employee.employeedesignation =
      employeedesignation ?? employee.employeedesignation;
    employee.manager_id = manager_id ?? employee.manager_id;
    employee.rep_manager = rep_manager ?? employee.rep_manager;

    const updatedEmployee = await employeeRepository.save(employee);

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/** Update employee leave details */
export async function handleUpdateEmployeeLeaves(
  req: Request,
  res: Response
): Promise<void> {
  const {
    bereavement_leaves,
    casual_leaves,
    earned_leaves,
    maternity_leaves,
    sick_leaves,
    total_leaves,
    id,
  } = req.body;

  if (!id) {
    res.status(400).json({ message: "Employee ID is required" });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const leaveRepository = AppDataSource.getRepository(EmployeeLeaves);
    const employeeRepository = AppDataSource.getRepository(EmployeeDetails);

    // Check if the employee exists
    const employee = await employeeRepository.findOne({
      where: { id },
      relations: ["leaves"],
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    // Check if leave entry exists, or create a new one
    let leaveDetails = await leaveRepository.findOne({
      where: { employee: { id } },
    });

    if (!leaveDetails) {
      leaveDetails = leaveRepository.create({ employee });
    }

    // Update leave details
    leaveDetails.bereavement_leaves =
      bereavement_leaves ?? leaveDetails.bereavement_leaves;
    leaveDetails.casual_leaves = casual_leaves ?? leaveDetails.casual_leaves;
    leaveDetails.earned_leaves = earned_leaves ?? leaveDetails.earned_leaves;
    leaveDetails.maternity_leaves =
      maternity_leaves ?? leaveDetails.maternity_leaves;
    leaveDetails.sick_leaves = sick_leaves ?? leaveDetails.sick_leaves;
    leaveDetails.total_leaves = total_leaves ?? leaveDetails.total_leaves;

    const updatedLeaves = await leaveRepository.save(leaveDetails);

    res.status(200).json(updatedLeaves);
  } catch (error) {
    console.error("Error updating employee leaves:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/** Get referral list with flattened employee details */
export async function handleReferralList(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const AppDataSource = await getConnection();
    const referralRepository = AppDataSource.getRepository(ReferralTable);

    // Fetch referrals with employee details
    const referrals = await referralRepository.find({
      relations: ["employee"],
    });

    // Flatten the result to exclude unnecessary employee details
    const formattedReferrals = referrals.map((referral) => ({
      id: referral.id,
      candidate_name: referral.candidate_name,
      candidate_email: referral.candidate_email,
      candidate_qualification: referral.candidate_qualification,
      candidate_phone_number: referral.candidate_phone_number,
      candidate_resume: referral.candidate_resume,
      candidate_status: referral.candidate_status,
      candidate_round: referral.candidate_round,
      candidate_selected: referral.candidate_selected,
      created_at: referral.created_at,
      updated_at: referral.updated_at,

      // Flattened employee details
      employeefirstname: referral.employee?.employeefirstname,
      employeelastname: referral.employee?.employeelastname,
      employeeemail: referral.employee?.employeeemail,
    }));

    res.status(200).json(formattedReferrals);
  } catch (error) {
    console.error("Error fetching referral list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Update referral candidate details */
export async function updateReferralCandidate(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const AppDataSource = await getConnection();
    const referralRepository = AppDataSource.getRepository(ReferralTable);

    const { id, candidate_status, candidate_round, candidate_selected } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Candidate ID is required" });
      return;
    }

    // Find the candidate
    const candidate = await referralRepository.findOne({ where: { id } });

    if (!candidate) {
      res.status(404).json({ message: "Candidate not found" });
      return;
    }

    // Update fields if provided
    candidate.candidate_status = candidate_status ?? candidate.candidate_status;
    candidate.candidate_round = candidate_round ?? candidate.candidate_round;
    candidate.candidate_selected =
      candidate_selected ?? candidate.candidate_selected;

    await referralRepository.save(candidate);

    res.status(200).json({ message: "Candidate updated successfully" });
  } catch (error) {
    console.error("Error updating referral candidate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Assign referral to a manager */
export async function handleReferralAssign(
  req: Request,
  res: Response
): Promise<void> {
  const { referralId, managerId } = req.body;

  if (!referralId || !managerId) {
    res
      .status(400)
      .json({ message: "Referral ID and Manager ID are required." });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const referralRepo = AppDataSource.getRepository(ReferralTable);
    const employeeRepo = AppDataSource.getRepository(EmployeeDetails);
    const assignmentRepo = AppDataSource.getRepository(ReferralAssignment);

    // Check if the referral exists
    const referral = await referralRepo.findOne({ where: { id: referralId } });
    if (!referral) {
      res.status(404).json({ message: "Referral not found." });
      return;
    }

    // Check if the manager exists and has a valid designation
    const manager = await employeeRepo.findOne({
      where: {
        id: managerId,
        employeedesignation: In(["manager", "team lead"]),
      },
    });
    if (!manager) {
      res.status(404).json({ message: "Manager not found or not valid." });
      return;
    }

    // Create a new referral assignment
    const assignment = assignmentRepo.create({
      referral,
      manager,
      status: "ASSIGNED",
    });

    const savedAssignment = await assignmentRepo.save(assignment);

    res.status(200).json({
      message: "Manager assigned successfully.",
      assignmentId: savedAssignment.id,
    });
  } catch (error) {
    console.error("Error assigning manager:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Get assigned managers */
export async function handleGetAssignedManagers(
  req: Request,
  res: Response
): Promise<void> {
  const referralId = parseInt(req.params.referralId, 10);

  if (isNaN(referralId)) {
    res.status(400).json({ message: "Invalid referral ID" });
    return;
  }

  try {
    const AppDataSource = await getConnection();
    const assignmentRepo = AppDataSource.getRepository(ReferralAssignment);

    const assignments = await assignmentRepo.find({
      where: { referral: { id: referralId } },
      relations: ["manager"],
      select: {
        manager: {
          id: true,
          employeefirstname: true,
          employeelastname: true,
          employeedesignation: true,
        },
        status: true,
      },
    });

    if (assignments.length === 0) {
      res
        .status(200)
        .json({ message: "No managers assigned to this referral." });
      return;
    }

    const formattedResult = assignments.map((assignment) => ({
      id: assignment.manager.id,
      employeefirstname: assignment.manager.employeefirstname,
      employeelastname: assignment.manager.employeelastname,
      employeedesignation: assignment.manager.employeedesignation,
      status: assignment.status,
    }));

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
