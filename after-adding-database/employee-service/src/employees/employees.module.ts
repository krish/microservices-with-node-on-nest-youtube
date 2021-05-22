import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeRepository } from './repository/employee.repository';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './service/employees.service';
import { Employee, EmployeeSchema } from './schemas/Employee.schema';
import { VehicleController } from './Vehicle.controller';
import { VehicleService } from './service/Vehicle.service';
import { VehicleRepository } from './repository/vehicle.repository';
import { Vehicle, VehicleSchema } from './schemas/Vehicle.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Employee.name, schema: EmployeeSchema },
    { name: Vehicle.name, schema: VehicleSchema }
  ])],
  controllers: [EmployeesController, VehicleController],
  providers: [EmployeesService, EmployeeRepository, VehicleService, VehicleRepository]
})
export class EmployeesModule { }
