import prisma from '../../db';
import { WorkExperience } from '@prisma/client';
import { ExperienceModel } from './experiences.model';

export function findOne(experienceId: string): Promise<WorkExperience | null> {
  return prisma.workExperience.findUnique({
    where: {
      id: experienceId,
    },
  });
}

export function createOne(
  experience: ExperienceModel
): Promise<WorkExperience> {
  const {
    jobTitle,
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
      jobTitle,
      jobDescription,
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
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
    jobTitle,
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
      jobTitle,
      jobDescription,
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
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
