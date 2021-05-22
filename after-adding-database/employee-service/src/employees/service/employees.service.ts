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


    constructor(private employeeRepository: EmployeeRepository) {

    }


    async getAll(): Promise<Employee[]> {
        return await this.employeeRepository.findAll();
    }

    async create(employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
        return await this.employeeRepository.create(employeeCreateDto);
    }


    /* employeeSearch(employeeSearchDto: EmployeeSearchDto) {
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
 */
    /*     getEmployeeById(id: string): Employee {
            const employees = this.getAllEmployees();
            let employee = employees.find(employee => employee.id === id)
            if (!employee) {
                throw new NotFoundException(`${id} ${Messages.EMPLOYEE_NOT_EXSIST}`)
            }
            return employee
        } */
    /*   updateEmployee(employeeUpdatedto: EmployeeUpdateDto): Employee {
  
          const { id, city } = employeeUpdatedto;
          let employee = this.getEmployeeById(id)
          employee.nearestCity = city
          return employee;
      } */

    async delete(id: string): Promise<boolean> {

        let x = await this.employeeRepository.delete(id);
        console.log(x)
        return x;

    }

}
