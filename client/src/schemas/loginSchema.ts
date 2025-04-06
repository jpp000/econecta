import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
});

export type LoginData = z.infer<typeof loginSchema>;
