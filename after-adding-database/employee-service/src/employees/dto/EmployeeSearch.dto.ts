import { IsIn } from "class-validator";
import { EmployeeStatus, EmployeeTier } from "../Employee.enum";

export class EmployeeSearchDto {
    status: EmployeeStatus
    name: string
}