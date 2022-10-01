import { z } from 'zod';

export const ParamsWithId = z.object({
  id: z.string().uuid({ message: 'Must be uuid' }),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
