import { z } from 'zod';

const medicineValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().positive("Price must be a positive number"),  
  symptoms: z.enum(["Cough & Flu" , "Fever" , "Eye & Ear" , "Allergy" , "Skin & Hair" , "Diabetes" ]),
  description: z.string().min(1, "Description is required"),
  manufacturerDetails: z.string().min(1, "Description is required"),
  genericName: z.string().min(1, "Description is required"),
  strength: z.string().min(1, "Description is required"),
  dosCategory: z.string().min(1, "Description is required"),

  quantity: z.number().min(1, "Quantity must be at least 1"),
  inStock: z.boolean(),
  expiryDate:z.date()
});


export default medicineValidationSchema;