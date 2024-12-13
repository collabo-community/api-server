import express, { IRouter } from 'express';
import {
  createGithubSyncController,
  getGithubSyncController,
  getOneGithubSyncController,
  updateOneGithubSyncController,
  deleteOneGithubSyncController,
} from '@githubsync/githubsync.controller';

const router: IRouter = express.Router();

router.get('/', getGithubSyncController);
router.post('/', createGithubSyncController);
router.get('/:settingID', getOneGithubSyncController);
router.patch('/:settingID', updateOneGithubSyncController);
router.delete('/:settingID', deleteOneGithubSyncController);

export { router };
