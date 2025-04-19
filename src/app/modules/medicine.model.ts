import { Document, Schema, model } from 'mongoose';
import { MedicineModel, TMedicine } from './medicine.interface';

export interface Product extends Document {
  name: string;
  brand: string;
  price: number;
  symptoms: "Cough & Flu" | "Fever" | "Eye & Ear" | "Allergy" | "Skin & Hair" | "Diabetes";
  description: string;
  manufacturerDetails:string;
  genericName:string;
  strength:string;
  dosCategory:string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
  expiryDate : Date
  isMedicineExists(id: string): Promise<boolean>;
}

const medicineSchema = new Schema<TMedicine>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    brand: { type: String, required: [true, 'Brand is required'] },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    Img: { type: String, default: '' },
    symptoms: {
      type: String,
      enum: ["Cough & Flu" , "Fever" , "Eye & Ear" , "Allergy" , "Skin & Hair" , "Diabetes"],
      required: [true, 'Medicine type is required'],
    },
    description: { type: String, required: [true, 'Description is required'] },
    manufacturerDetails:{ type: String, required: [true, 'Manufacturer Details is required']},
    genericName:{ type: String, required: [true, 'Generic Name  is required']},
    strength:{ type: String, required: [true, 'strength is required']},
    dosCategory:{ type: String, required: [true, 'dosCategory  is required']},

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: { type: Boolean, default: true },
    expiryDate:{type:Date,required:true}
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

medicineSchema.methods.isMedicineExists = async function (id: string) {
  const medicine = await this.model('Medicine').findById(id);
  return medicine !== null;
};

export const Medicine = model<TMedicine>('Medicine', medicineSchema);

const MedicineModel = model('Medicine', medicineSchema);

export default MedicineModel;