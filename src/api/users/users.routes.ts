import { Router } from 'express';
import { ParamsWithId } from 'interfaces/ParamsWithId';
import { validateRequest } from 'zod-express-middleware';

import * as UsersControllers from './users.controllers';
import { UserModel } from './users.model';

const router = Router();

// GET /users
router.get('/', UsersControllers.findAllUsers);

// GET /users/:id
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsersControllers.findUserById
);

// POST /users
router.post(
  '/',
  validateRequest({ body: UserModel }),
  UsersControllers.createUser
);

// PUT /users/:id
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: UserModel,
  }),
  UsersControllers.updateUser
);

// DELETE /users/:id
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsersControllers.deleteUser
);

export default router;
