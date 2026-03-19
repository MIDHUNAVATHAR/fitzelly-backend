/* --------------- Repositories (infrastructure) ---------------- */
import { GymRepository } from "../infrastructure/repositories/GymRepository";
import { SuperAdminRepository } from "../infrastructure/repositories/SuperAdminRepository";
import { OtpRepository } from "../infrastructure/repositories/OtpRepository";
import { ClientRepository } from "../infrastructure/repositories/ClientRepository";
import { TrainerRepository } from "../infrastructure/repositories/TrainerRepository";
import { MembershipRepository } from "../infrastructure/repositories/MembershipRepository";
import { PaymentRepository } from "../infrastructure/repositories/PaymentRepository";
import { PlanRepository } from "../infrastructure/repositories/PlanRepository";
import { EquipmentRepository } from "../infrastructure/repositories/EquipmentRepository";
import { SubscriptionRepository } from "../infrastructure/repositories/SubscriptionRepository";
import { AttendanceRepository } from "../infrastructure/repositories/AttendanceRepository";
import { WorkoutPlanRepository } from "../infrastructure/repositories/WorkoutPlanRepository";
import { WorkoutLogRepository } from "../infrastructure/repositories/WorkoutLogRepository";
import { EnquiryRepository } from "../infrastructure/repositories/EnquiryRepository";
import { ExpenseRepository } from "../infrastructure/repositories/ExpenseRepository";



/* ------------------- Instantiate Repositories ---------------- */
export const gymRepository = new GymRepository();
export const otpRepository = new OtpRepository();
export const superAdminRepository = new SuperAdminRepository();
export const clientRepository = new ClientRepository();
export const trainerRepository = new TrainerRepository();
export const membershipRepository = new MembershipRepository();
export const paymentRepository = new PaymentRepository();
export const planRepository = new PlanRepository();
export const equipmentRepository = new EquipmentRepository();
export const subscriptionRepository = new SubscriptionRepository();
export const attendanceRepository = new AttendanceRepository();
export const workoutPlanRepository = new WorkoutPlanRepository();
export const workoutLogRepository = new WorkoutLogRepository();
export const enquiryRepository = new EnquiryRepository();
export const expenseRepository = new ExpenseRepository();