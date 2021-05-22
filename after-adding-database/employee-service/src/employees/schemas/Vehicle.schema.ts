import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Employee } from "./Employee.schema"
import * as mongoose from 'mongoose'

export type VehicleDocument = Vehicle & mongoose.Document

@Schema()
export class Vehicle {

    @Prop()
    id: string
    @Prop()
    make: string
    @Prop()
    model: string
    @Prop()
    vin: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
    employee: Employee

}
export const VehicleSchema = SchemaFactory.createForClass(Vehicle)