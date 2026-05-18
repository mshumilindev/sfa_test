import { emailCheckQuerySchema } from '@/features/candidates/schemas/emailCheckSchema';

describe('emailCheckQuerySchema', () => {
  it('accepts valid emails and rejects invalid input', () => {
    expect(emailCheckQuerySchema.safeParse({ email: 'user@example.com' }).success).toBe(true);
    expect(emailCheckQuerySchema.safeParse({ email: 'not-an-email' }).success).toBe(false);
  });
});
