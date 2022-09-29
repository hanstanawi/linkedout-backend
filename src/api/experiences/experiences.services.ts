import { PrismaClient, WorkExperience } from '@prisma/client';
import { ExperienceModel } from './experiences.model';

const prisma = new PrismaClient();

export function findOne(experienceId: string): Promise<WorkExperience> {
  return prisma.workExperience.findUniqueOrThrow({
    where: {
      id: experienceId,
    },
  });
}

// TODO: add job title to prisma schema
export function createOne(
  experience: ExperienceModel
): Promise<WorkExperience> {
  const {
    jobDescription,
    startDate,
    endDate,
    companyName,
    companyLogo,
    userId,
    isCurrent,
  } = experience;

  return prisma.workExperience.create({
    data: {
      jobDescription,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate || '').toISOString(),
      companyName,
      companyLogo: companyLogo,
      userId,
      isCurrent,
    },
  });
}

export function updateOne(
  experienceId: string,
  experience: ExperienceModel
): Promise<WorkExperience> {
  const {
    jobDescription,
    startDate,
    endDate,
    companyName,
    companyLogo,
    userId,
    isCurrent,
  } = experience;

  return prisma.workExperience.update({
    where: {
      id: experienceId,
    },
    data: {
      jobDescription,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate || '').toISOString(),
      companyName,
      companyLogo: companyLogo,
      userId,
      isCurrent,
    },
  });
}

export async function deleteOne(experienceId: string): Promise<string> {
  await prisma.workExperience.delete({
    where: {
      id: experienceId,
    },
  });
  return experienceId;
}
