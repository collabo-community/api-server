import { NextFunction, Request, Response } from 'express';
import {
  createGithubSyncService,
  getGithubSyncService,
  getOneGithubSyncService,
  deleteOneGithubSyncService,
  updateOneGithubSyncService,
} from '@githubsync/githubsync.service';
import { success } from '@lib/helpers';
// import { ReqUser } from '@ts-types/index';
// import { error } from '@lib/helpers';

const routeName = 'githubsync';
const item = `${routeName}-item`;

let response: { [key: string]: unknown } = {};

export const createGithubSyncController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await createGithubSyncService(req.body);
    response = {
      message: `${item} created successfully!`,
      data: {
        _id: doc._id,
        global: doc.global,
        githubsync_instance_name: doc.githubsync_instance_name,
        github: {
          user_name: doc.github.user_name,
          repo_name: doc.github.repo_name
        },
        createAt: doc.createdAt,
        updatedAt: doc.updatedAt
      },
    }
    success(`${item} CREATED successfully!`);
    return res.status(201).json(response);  
  } catch (err) {
    next(err);
  }
}

export const getGithubSyncController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await getGithubSyncService();
    response = {
      message: `all ${item}s gotten successfully!`,
      count: docs.length,
      data: docs.map(doc => {
        return {
          _id: doc._id,
          global: doc.global,
          githubsync_instance_name: doc.githubsync_instance_name,
          github: {
            user_name: doc.github.user_name,
            repo_name: doc.github.repo_name
          },
          createAt: doc.createdAt,
          updatedAt: doc.updatedAt
        }
      })
    };
    success(`all ${item} gotten successfully!`);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export const getOneGithubSyncController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.settingID;
    const doc = await getOneGithubSyncService(id);
    response = {
      message: `${item} with id:${id} gotten successfully!`,
      data: {
        _id: doc._id,
        global: doc.global,
        githubsync_instance_name: doc.githubsync_instance_name,
        github: {
          user_name: doc.github.user_name,
          repo_name: doc.github.repo_name
        },
        createAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }
    }
    success(`${item} with id:${id} gotten successfully!`);
    return res.status(200).json(response);  
  } catch (err) {
    next(err);
  }
}

export const deleteOneGithubSyncController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.settingID;
    await deleteOneGithubSyncService(id);
    response = {
      message: `${item} with id:${id} deleted successfully!`,
    }
    success(`${item} with id:${id} deleted successfully!`);
    return res.status(200).json(response); 
  } catch (err) {
    next(err);
  }
};

export const updateOneGithubSyncController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.settingID;
    const doc = await updateOneGithubSyncService(id, req.body);
    response = {
      message: `Update request for ID ${id} successful!`,
      data: {
        _id: doc._id,
        global: doc.global,
        githubsync_instance_name: doc.githubsync_instance_name,
        github: {
          user_name: doc.github.user_name,
          repo_name: doc.github.repo_name
        },
        createAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }
    }
    success(`Update request for ID ${id} successful!`);
    return res.status(200).json(response);  
  } catch (err) {
    next(err);
  }
};