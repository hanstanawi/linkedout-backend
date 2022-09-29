import { User } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import { UserModel } from './users.model';

import * as UsersServices from './users.services';

export async function findAllUsers(
  req: Request,
  res: Response<User[]>,
  next: NextFunction
) {
  try {
    const users = await UsersServices.findAll();
    return res.status(200).json(users);
  } catch (err: any) {
    next(err);
  }
}

export async function findUserById(
  req: Request<ParamsWithId, User, {}>,
  res: Response<User>,
  next: NextFunction
) {
  try {
    const userId = req.params.id as string;
    const user = await UsersServices.findOneById(userId);
    return res.status(200).json(user);
  } catch (err: any) {
    next(err);
  }
}

export async function createUser(
  req: Request<ParamsWithId, User, UserModel>,
  res: Response<User>,
  next: NextFunction
) {
  try {
    const newUser = req.body;
    const user = await UsersServices.createOne(newUser);
    return res.status(201).json(user);
  } catch (err: any) {
    next(err);
  }
}

export async function updateUser(
  req: Request<ParamsWithId, User, UserModel>,
  res: Response<User>,
  next: NextFunction
) {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await UsersServices.updateOne(userId, updatedUser);
    return res.status(201).json(user);
  } catch (err: any) {
    next(err);
  }
}

export async function deleteUser(
  req: Request<ParamsWithId, string, {}>,
  res: Response<string>,
  next: NextFunction
) {
  try {
    const userId = req.params.id;
    const deletedUserId = await UsersServices.deleteOne(userId);
    return res.status(200).json(deletedUserId);
  } catch (err: any) {
    next(err);
  }
}
