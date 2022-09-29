import { User } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

import * as UsersService from './users.service';

const router = Router();

// GET /users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UsersService.findAllUsers();
    return res.status(200).json(users);
  } catch (err: any) {
    next(err);
  }
});

// GET /users/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id as string;
    const user = await UsersService.findUserById(userId);
    return res.status(200).json(user);
  } catch (err: any) {
    next(err);
  }
});

// POST /users
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body as Omit<User, 'id'>;
    const user = await UsersService.createUser(newUser);
    return res.status(201).json(user);
  } catch (err: any) {
    next(err);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id as string;
    const updatedUser = req.body as Omit<User, 'id'>;
    const user = await UsersService.updateUser(userId, updatedUser);
    return res.status(201).json(user);
  } catch (err: any) {
    next(err);
  }
});

export default router;
