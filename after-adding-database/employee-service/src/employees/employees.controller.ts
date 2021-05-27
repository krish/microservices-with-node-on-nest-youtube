import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { request } from 'express';
import { EmployeeTierValidationPipe } from 'src/employee-tier-validation.pipe';
import { EmployeeTier } from './Employee.enum';
import { EmployeeCreateDto } from './dto/EmployeeCreate.dto';
import { EmployeesService } from './service/employees.service';
import { EmployeeSearchDto } from './dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdate.dto';
import { Messages } from './Messages.data';
import { Employee } from './schemas/Employee.schema';

@Controller('employees')
export class EmployeesController {


    constructor(private employeeService: EmployeesService) { }
    @Get()
    @UsePipes(ValidationPipe)
    async getAllEmployees(@Query() param: EmployeeSearchDto): Promise<Employee[]> {
        if (Object.keys(param).length) {
            return this.employeeService.employeeSearch(param)
        } else {
            return this.employeeService.getAll()
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UsePipes(new EmployeeTierValidationPipe())
    createEmployee(@Body() employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
        return this.employeeService.create(employeeCreateDto)
    }
    @Get('/:id')
    getEmployeeById(@Param('id') id: string): Promise<Employee> {

        return this.employeeService.getEmployeeById(id)
    }

    @Put('/:id/city')
    updateEmployee(@Param('id') id: string, @Body() employeeUpdateDto: EmployeeUpdateDto): Promise<Employee> {
        employeeUpdateDto.id = id
        return this.employeeService.updateEmployee(employeeUpdateDto)
    }
    @Delete('/:id')
    @HttpCode(204)
    async deleteEmployee(@Param('id') id: string) {
        let y = await this.employeeService.delete(id);
        if (!y) {
            throw new NotFoundException('Record not found to delete')
        }

    }
}
