import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeStatus, EmployeeTier } from '../Employee.enum';
import { v1 as uuid } from 'uuid'
import { EmployeeSearchDto } from '../dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from '../dto/EmployeeUpdate.dto';
import { EmployeeCreateDto } from '../dto/EmployeeCreate.dto';
import { Messages } from '../Messages.data';
import { Employee } from '../schemas/Employee.schema';
import { EmployeeRepository } from '../repository/employee.repository';

@Injectable()
export class EmployeesService {


    constructor(private employeeRepository: EmployeeRepository) { }

    async getAll(): Promise<Employee[]> {
        return await this.employeeRepository.findAll();
    }

    async create(employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
        return await this.employeeRepository.create(employeeCreateDto);
    }


    employeeSearch(employeeSearchDto: EmployeeSearchDto) {
        return this.employeeRepository.findWithFilters(employeeSearchDto);
    }

    getEmployeeById(id: string): Promise<Employee> {

        let employee = this.employeeRepository.findOne(id)
        if (!employee) {
            throw new NotFoundException(`${id} ${Messages.EMPLOYEE_NOT_EXSIST}`)
        }
        return employee
    }
    updateEmployee(employeeUpdatedto: EmployeeUpdateDto): Promise<Employee> {

        return this.employeeRepository.update(employeeUpdatedto)
    }

    async delete(id: string): Promise<boolean> {

        let x = await this.employeeRepository.delete(id);
        console.log(x)
        return x;

    }

}
