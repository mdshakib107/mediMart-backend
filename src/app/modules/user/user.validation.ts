import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name is not a valid string',
      })
      .min(2)
      .max(50),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email is not a valid string',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password is not a valid string',
      })
      .min(4, { message: 'Password should not be less than 4 characters' })
      .max(20, { message: 'Password should not be more than 20 characters' }),
  }),
});

export const userValidations = {
  userValidationSchema,
};