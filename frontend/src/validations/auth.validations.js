import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm password must be 6 characters long")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password should be same",
    path: ["confirmPassword"],
});

export const userLoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})