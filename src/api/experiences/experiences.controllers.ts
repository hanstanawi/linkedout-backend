import { WorkExperience } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';

import { ParamsWithId } from 'interfaces/ParamsWithId';
import { ExperienceModel } from './experiences.model';

import * as ExperiencesServices from './experiences.services';

export async function getExperienceById(
  req: Request<ParamsWithId, WorkExperience, {}>,
  res: Response<WorkExperience>,
  next: NextFunction
) {
  try {
    const experienceId = req.params.id;
    const user = await ExperiencesServices.findOne(experienceId);
    return res.status(200).json(user);
  } catch (err: any) {
    next(err);
  }
}

export async function createExperience(
  req: Request<{}, WorkExperience, ExperienceModel>,
  res: Response<WorkExperience>,
  next: NextFunction
) {
  try {
    const experience = req.body;
    const newExperience = await ExperiencesServices.createOne(experience);
    return res.status(201).json(newExperience);
  } catch (err: any) {
    next(err);
  }
}

export async function updateExperience(
  req: Request<ParamsWithId, WorkExperience, ExperienceModel>,
  res: Response<WorkExperience>,
  next: NextFunction
) {
  try {
    const experienceId = req.params.id;
    const updatedUser = req.body;
    const updatedExperience = await ExperiencesServices.updateOne(
      experienceId,
      updatedUser
    );
    return res.status(201).json(updatedExperience);
  } catch (err: any) {
    next(err);
  }
}

export async function deleteExperience(
  req: Request<ParamsWithId, string, {}>,
  res: Response<string>,
  next: NextFunction
) {
  try {
    const experienceId = req.params.id;
    await ExperiencesServices.deleteOne(experienceId);
    return res.status(204).json(experienceId);
  } catch (err: any) {
    next(err);
  }
}
