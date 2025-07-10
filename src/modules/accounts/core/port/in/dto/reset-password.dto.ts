import { z } from "zod";

export const resetPasswordDTOSchema = z.object({
  code: z.string().length(8, "Confirmation code must be exactly 8 digits."),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long.")
    .max(64, "New password must not exceed 64 characters."),
});

export type ResetPasswordDTO = z.infer<typeof resetPasswordDTOSchema>;
