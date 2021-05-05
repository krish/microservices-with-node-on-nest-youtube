import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee, EmployeeStatus, EmployeeTier } from './Employee.model';
import { v1 as uuid } from 'uuid'
import { EmployeeSearchDto } from './EmployeeSearch.dto';
import { EmployeeUpdateDto } from './EmployeeUpdate.dto';
import { EmployeeCreateDto } from './EmployeeCreate.dto';
import { Messages } from './Messages.data';

@Injectable()
export class EmployeesService {

    private employees: Employee[] = []

    getAllEmployees(): Employee[] {
        return this.employees;
    }

    createEmployee(employeeCreateDto: EmployeeCreateDto): Employee {

        const { firstName,
            lastName,
            designation,
            nearestCity,
            tier } = employeeCreateDto
        const employee = {
            id: uuid(),
            firstName,
            lastName,
            designation,
            nearestCity,
            tier,
            status: EmployeeStatus.ACTIVE
        }
        this.employees.push(employee)
        return employee;

    }


    employeeSearch(employeeSearchDto: EmployeeSearchDto) {
        const { status, name } = employeeSearchDto;
        let employees = this.getAllEmployees();
        if (status) {
            employees = employees.filter(employee => employee.status === status);
            //   console.log(employees)
        }
        if (name) {
            employees = employees.filter(employee => employee.firstName.includes(name) || employee.lastName.includes(name))
            console.log(employees)
        }
        return employees;
    }

    getEmployeeById(id: string): Employee {
        const employees = this.getAllEmployees();
        let employee = employees.find(employee => employee.id === id)
        if (!employee) {
            throw new NotFoundException(`${id} ${Messages.EMPLOYEE_NOT_EXSIST}`)
        }
        return employee
    }
    updateEmployee(employeeUpdatedto: EmployeeUpdateDto): Employee {

        const { id, city } = employeeUpdatedto;
        let employee = this.getEmployeeById(id)
        employee.nearestCity = city
        return employee;
    }

    deleteEmployee(id: string): boolean {
        let employees = this.getAllEmployees();
        this.employees = employees.filter(employee => employee.id != id)
        return (employees.length != this.employees.length)
    }

}
