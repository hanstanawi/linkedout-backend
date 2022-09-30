import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';

import * as ExperiencesControllers from './experiences.controllers';
import { ExperienceModel } from './experiences.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

// GET /work-experiences/:id
router.get(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  ExperiencesControllers.getExperienceById
);

// POST /work-experiences
// Request<Params, ResponseType, ReqBody>
router.post(
  '/',
  validateRequest({ body: ExperienceModel }),
  ExperiencesControllers.createExperience
);

// PUT /work-experiences/:id
router.put(
  '/:id',
  validateRequest({ params: ParamsWithId, body: ExperienceModel }),
  ExperiencesControllers.updateExperience
);

// DELETE /work-experiences/:id
router.delete(
  '/:id',
  validateRequest({ params: ParamsWithId }),
  ExperiencesControllers.deleteExperience
);

export default router;
