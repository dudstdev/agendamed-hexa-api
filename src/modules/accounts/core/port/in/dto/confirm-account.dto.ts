import { z } from "zod";

export const confirmAccountDTOSchema = z.object({
  code: z.string().length(8, "Confirmation code must be exactly 8 digits."),
});

export type ConfirmAccountDTO = z.infer<typeof confirmAccountDTOSchema>;
