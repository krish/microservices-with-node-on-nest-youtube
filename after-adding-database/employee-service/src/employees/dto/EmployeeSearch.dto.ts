import { IsIn } from "class-validator";
import { EmployeeStatus, EmployeeTier } from "../Employee.enum";

export class EmployeeSearchDto {
    designation: string
    name: string
}