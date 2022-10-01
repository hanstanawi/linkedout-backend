import { WorkExperience } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { ExperienceModel } from './experiences.model';

import * as ExperiencesServices from './experiences.services';

export async function getExperienceById(
  req: Request<ParamsWithId, WorkExperience, {}>,
  res: Response<WorkExperience>,
  next: NextFunction
) {
  try {
    const experienceId = req.params.id;
    const experience = await ExperiencesServices.findOne(experienceId);

    if (!experience) {
      res.status(404);
      throw new Error(`Experience with id ${experienceId} not found.`);
    }

    return res.status(200).json(experience);
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
    const experience = req.body;
    // Find existing experience
    const existingExperience = await ExperiencesServices.findOne(experienceId);

    if (!existingExperience) {
      res.status(404);
      throw new Error(
        `Experience with id ${experienceId} not found. Could not update`
      );
    }

    const updatedExperience = await ExperiencesServices.updateOne(
      experienceId,
      experience
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
    // Find existing experience
    const existingExperience = await ExperiencesServices.findOne(experienceId);

    if (!existingExperience) {
      res.status(404);
      throw new Error(
        `Experience with id ${experienceId} not found. Could not delete`
      );
    }

    await ExperiencesServices.deleteOne(experienceId);
    return res.status(204).json(experienceId);
  } catch (err: any) {
    next(err);
  }
}
