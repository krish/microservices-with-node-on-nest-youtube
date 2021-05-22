import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { EmployeeTier } from './employees/Employee.model';

@Injectable()
export class EmployeeTierValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!(value.tier in EmployeeTier)) {
      throw new BadRequestException(`${value.tier} is not a valid tier`)
    }
    return value;
  }
}
