import { z } from 'zod';

// Only for validation purpose
export const ExperienceModel = z.object({
  jobTitle: z.string().min(1),
  jobDescription: z.string().min(1).nullable(),
  startDate: z.string(),
  endDate: z.string().nullable(),
  isCurrent: z.boolean(),
  companyName: z.string().min(1),
  companyLogo: z.string().url({ message: 'Must be url' }).nullable(),
  userId: z.string().uuid(),
});

export type ExperienceModel = z.infer<typeof ExperienceModel>;
