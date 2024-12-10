import { NextFunction, Request, Response } from 'express';
import {
  createCollabocateService,
  getCollabocateService,
  getOneCollabocateService,
  deleteOneCollabocateService,
  updateOneCollabocateService,
} from '@collabocate/collabocate.service';
import { success } from '@lib/helpers';
// import { ReqUser } from '@ts-types/index';
// import { error } from '@lib/helpers';

const routeName = 'collabocate';
const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

export const createCollabocateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await createCollabocateService(req.body);
    response = {
      message: `${item} created successfully!`,
      data: {
        _id: doc._id,
        global: doc.global,
        app_name: doc.app_name,
        github_username: doc.github_username,
        repo_name: doc.repo_name,
      },
    }
    success(`${item} CREATED successfully!`);
    return res.status(201).json(response);  
  } catch (err) {
    next(err);
  }
}

export const getCollabocateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await getCollabocateService();
    response = {
      message: `all ${item}s gotten successfully!`,
      count: docs.length,
      data: docs.map(doc => {
        return {
          _id: doc._id,
          global: doc.global,
          app_name: doc.app_name,
          github_username: doc.github_username,
          repo_name: doc.repo_name,
        }
      })
    };
    success(`all ${item} gotten successfully!`);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export const getOneCollabocateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.settingID;
    const doc = await getOneCollabocateService(id);
    response = {
      message: `${item} with id:${id} gotten successfully!`,
      data: {
        _id: doc._id,
        global: doc.global,
        app_name: doc.app_name,
        github_username: doc.github_username,
        repo_name: doc.repo_name,
      }
    }
    success(`${item} with id:${id} gotten successfully!`);
    return res.status(200).json(response);  
  } catch (err) {
    next(err);
  }
}

export const deleteOneCollabocateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.settingID;
    await deleteOneCollabocateService(id);
    response = {
      message: `${item} with id:${id} deleted successfully!`,
    }
    success(`${item} with id:${id} deleted successfully!`);
    return res.status(200).json(response); 
  } catch (err) {
    next(err);
  }
};

export const updateOneCollabocateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.settingID;
    const doc = await updateOneCollabocateService(id, req.body);
    response = {
      message: `Update request for ID ${id} successful!`,
      data: {
        _id: doc._id,
        global: doc.global,
        app_name: doc.app_name,
        github_username: doc.github_username,
        repo_name: doc.repo_name,
      }
    }
    success(`Update request for ID ${id} successful!`);
    return res.status(200).json(response);  
  } catch (err) {
    next(err);
  }
};