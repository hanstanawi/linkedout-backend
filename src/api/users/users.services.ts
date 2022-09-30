import { PrismaClient, User } from '@prisma/client';
import { UserModel } from './users.model';

const prisma = new PrismaClient();

export function findAll(): Promise<User[]> {
  return prisma.user.findMany({
    include: {
      workExperiences: true,
    },
  });
}

export function findOneById(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    include: {
      workExperiences: true,
    },
    where: {
      id: userId,
    },
  });
}

export function createOne(user: UserModel): Promise<User> {
  const { firstName, lastName, birthDate, profileImage } = user;
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      birthDate: new Date(birthDate).toISOString(),
      profileImage,
    },
    include: {
      workExperiences: true,
    },
  });
}

export function updateOne(userId: string, user: UserModel): Promise<User> {
  const { firstName, lastName, birthDate, profileImage } = user;
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName,
      lastName,
      birthDate: new Date(birthDate).toISOString(),
      profileImage,
    },
    include: {
      workExperiences: true,
    },
  });
}

export async function deleteOne(userId: string): Promise<string> {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return userId;
}
