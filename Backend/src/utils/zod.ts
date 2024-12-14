import { z } from "zod";
import { ILoginUser, IUser } from "../types/schema";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(20, "First name must be at most 20 characters long"),
  userName: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(10, "First name must be at most 10 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

const loginSchema = z.object({
  userName: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(10, "First name must be at most 10 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});
export const validateUserRegistration = (userInfo: IUser) => {
  return registerSchema.parse(userInfo);
};
export const validateUserLogin = (userInfo: ILoginUser) => {
  return loginSchema.parse(userInfo);
};
