import { IsEmpty, IsIn, IsNotEmpty, NotEquals, notEquals, ValidateIf } from "class-validator";
import { EmployeeStatus, EmployeeTier } from "./Employee.model";

export class EmployeeCreateDto {
    id: string
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    @NotEquals('CEO')
    designation: string
    nearestCity: string
    //@IsIn(Object.values(EmployeeTier)) <- this way also possible. but we developed
    //custom pipe to demostrate usage of that
    tier: EmployeeTier
    @ValidateIf(s => typeof s.status !== 'undefined') //<- conditional validation if status given it should be type of EmployeeStatus. but if not given its ignored
    @IsIn(Object.values(EmployeeStatus))
    status: EmployeeStatus
}