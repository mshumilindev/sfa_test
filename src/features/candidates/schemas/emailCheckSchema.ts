import { z } from 'zod';

export const emailCheckQuerySchema = z.object({
  email: z.string().trim().email(),
});
