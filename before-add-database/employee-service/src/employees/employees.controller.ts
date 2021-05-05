import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { request } from 'express';
import { EmployeeTierValidationPipe } from 'src/employee-tier-validation.pipe';
import { Employee, EmployeeTier } from './Employee.model';
import { EmployeeCreateDto } from './EmployeeCreate.dto';
import { EmployeesService } from './employees.service';
import { EmployeeSearchDto } from './EmployeeSearch.dto';
import { EmployeeUpdateDto } from './EmployeeUpdate.dto';
import { Messages } from './Messages.data';

@Controller('employees')
export class EmployeesController {


    constructor(private employeeService: EmployeesService) { }
    @Get()
    @UsePipes(ValidationPipe)
    getAllEmployees(@Query() param: EmployeeSearchDto): Employee[] {
        if (Object.keys(param).length) {
            return this.employeeService.employeeSearch(param)
        } else {
            return this.employeeService.getAllEmployees()
        }

    }

    @Post()
    @UsePipes(ValidationPipe)
    @UsePipes(new EmployeeTierValidationPipe())
    createEmployee(@Body() employeeCreateDto: EmployeeCreateDto): Employee {
        return this.employeeService.createEmployee(employeeCreateDto)
    }
    @Get('/:id')
    getEmployeeById(@Param('id') id: string): Employee {

        return this.employeeService.getEmployeeById(id)
    }

    @Put('/:id/city')
    updateEmployee(@Param('id') id: string, @Body() employeeUpdateDto: EmployeeUpdateDto): Employee {
        employeeUpdateDto.id = id
        return this.employeeService.updateEmployee(employeeUpdateDto)
    }
    @Delete('/:id')
    @HttpCode(204)
    deleteEmployee(@Param('id') id: string) {
        if (!this.employeeService.deleteEmployee(id)) {
            throw new NotFoundException(Messages.EMPLOYEE_NOT_EXSIST)
        }
    }
}
