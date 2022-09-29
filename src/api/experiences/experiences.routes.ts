import { Router } from 'express';

import * as ExperiencesControllers from './experiences.controllers';

const router = Router();

// GET /work-experiences/:id
router.get('/:id', ExperiencesControllers.getExperienceById);

// POST /work-experiences
// Request<Params, ResponseType, ReqBody>
router.post('/', ExperiencesControllers.createExperience);

// PUT /work-experiences/:id
router.put('/:id', ExperiencesControllers.updateExperience);

// DELETE /work-experiences/:id
router.delete('/:id', ExperiencesControllers.deleteExperience);

export default router;
