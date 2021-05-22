import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [EmployeesModule, MongooseModule.forRoot(MONGO_CONNECTION)],
})
export class AppModule { }
