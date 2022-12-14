import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import users from './users/users.routes';
import experiences from './experiences/experiences.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Work Experience API',
  });
});

router.use('/users', users);
router.use('/experiences', experiences);

export default router;
