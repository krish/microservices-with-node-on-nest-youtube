import { IsIn } from "class-validator";
import { EmployeeStatus, EmployeeTier } from "./Employee.model";

export class EmployeeSearchDto {
    status: EmployeeStatus
    name: string
}