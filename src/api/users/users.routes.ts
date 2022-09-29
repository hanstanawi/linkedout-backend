import type { Request, Response } from 'express';
import { Router } from 'express';

const router = Router();

// GET /users
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Get users endpoint' });
});

// GET /users/:id
router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Get user endpoint' });
});

// POST /users
router.post('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Create user endpoint' });
});

router.put('/:id', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Update user endpoint' });
});

export default router;
