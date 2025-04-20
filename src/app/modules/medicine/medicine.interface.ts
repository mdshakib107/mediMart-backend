import { Model } from 'mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';


  export interface TMedicine extends Document {
    name: string;
    Img?: string; 
    brand: string;
    price: number;
    symptoms: "Cough & Flu" | "Fever" | "Eye & Ear" | "Allergy" | "Skin & Hair" | "Diabetes" ;
    description: string;
    manufacturerDetails:string;
    genericName:string;
    strength:string;
    dosCategory:string;
    quantity: number;
    inStock: boolean;
    expiryDate : Date
  }

  export interface Medicine extends Model<TMedicine> {
    calculateTotalPrice(medicineId: Types.ObjectId, quantity: number): Promise<number>; 
    isUserExists(id: string): Promise<TMedicine | null>;  
  }