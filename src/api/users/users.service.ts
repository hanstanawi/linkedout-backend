import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export function findAllUsers(): Promise<User[]> {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      createdAt: true,
      birthDate: true,
      workExperiences: {
        select: {
          id: true,
          companyName: true,
          jobDescription: true,
          startDate: true,
          isCurrent: true,
          companyLogo: true,
          endDate: true,
          createdAt: true,
        },
      },
    },
  });
}

export function findUserById(userId: string): Promise<User | null> {
  return prisma.user.findUniqueOrThrow({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      createdAt: true,
      birthDate: true,
      workExperiences: {
        select: {
          id: true,
          companyName: true,
          jobDescription: true,
          startDate: true,
          isCurrent: true,
          companyLogo: true,
          endDate: true,
          createdAt: true,
        },
      },
    },
    where: {
      id: userId,
    },
  });
}

export function createUser(user: Omit<User, 'id'>): Promise<User> {
  const { firstName, lastName, birthDate, profileImage } = user;
  return prisma.user.create({
    data: {
      firstName,
      lastName,
      birthDate: new Date(birthDate).toISOString(),
      profileImage,
    },
  });
}

export function updateUser(
  userId: string,
  user: Omit<User, 'id'>
): Promise<User> {
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
  });
}

export async function deleteUser(userId: string): Promise<string> {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return userId;
}
