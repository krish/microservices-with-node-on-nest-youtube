import { Injectable } from "@nestjs/common";
import { VehicleCreateDTO } from "../dto/VehicleCreate.dto";
import { VehicleRepository } from "../repository/vehicle.repository";
import { Vehicle, VehicleDocument } from "../schemas/Vehicle.schema";

@Injectable()
export class VehicleService {

    constructor(private vehicleRepository: VehicleRepository) { }
    async create(vehicleCreateDTO: VehicleCreateDTO): Promise<Vehicle> {
        return await this.vehicleRepository.create(vehicleCreateDTO)
    }
    async getAll(): Promise<Vehicle[]> {
        return await this.vehicleRepository.findAll();
    }
}