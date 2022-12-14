import { z } from 'zod';

// Only for validation purpose
export const UserModel = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthDate: z.string(),
  about: z.string().nullable(),
  profileImage: z.string().url({ message: 'Must be url' }).nullable(),
});

export type UserModel = z.infer<typeof UserModel>;
