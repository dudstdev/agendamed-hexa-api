import { z } from "zod";

export const passwordResetDTOSchema = z.object({
  email: z.string().email("Invalid email format."),
});

export type PasswordResetDTO = z.infer<typeof passwordResetDTOSchema>;
