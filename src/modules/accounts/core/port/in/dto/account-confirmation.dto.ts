import { z } from "zod";

export const accountConfirmationDTOSchema = z.object({
  email: z.string().email("Invalid email format."),
});

export type AccountConfirmationDTO = z.infer<
  typeof accountConfirmationDTOSchema
>;
