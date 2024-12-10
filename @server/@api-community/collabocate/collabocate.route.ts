import express, { IRouter } from 'express';
import {
  createCollabocateController,
  getCollabocateController,
  getOneCollabocateController,
  updateOneCollabocateController,
  deleteOneCollabocateController,
} from '@collabocate/collabocate.controller';

const router: IRouter = express.Router();

router.get('/', getCollabocateController);
router.post('/', createCollabocateController);
router.get('/:settingID', getOneCollabocateController);
router.patch('/:settingID', updateOneCollabocateController);
router.delete('/:settingID', deleteOneCollabocateController);

export { router };
