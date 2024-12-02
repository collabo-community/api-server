import express, { IRouter } from 'express';
import { createIssueController, getIssuesController, getPullRequestsController, getRepositoriesController,getIssueTemplatesController } from '@api-github/github.controller';

const router: IRouter = express.Router();

router.get('/issues', getIssuesController);
//-------------------------------------------
router.post('/issues', createIssueController);
//-------------------------------------------
router.get('/issue-templates', getIssueTemplatesController);
router.get('/pull-requests', getPullRequestsController);
router.get('/repositories', getRepositoriesController);

export { router };
