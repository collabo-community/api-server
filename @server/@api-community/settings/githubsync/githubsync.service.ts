import { badRequestErr, notFoundErr } from '@lib/errors/Errors';
import { GithubSyncDocument, GithubSyncModel as GithubSync } from '@githubsync/githubsync.model';


export const createGithubSyncService = async (requestBody: GithubSyncDocument): Promise<GithubSyncDocument> => {
  if (Object.keys(requestBody).includes("global") && requestBody.global === true) {
    const query = await GithubSync.findOne({global: true}).exec();
    if(query){
      badRequestErr('A global setting already exists, Only One Global Setting can exist');
    }
    if (requestBody.githubsync_instance_name) {
      badRequestErr('global setting does not require <githubsync_instance_name> property');
    }
  }

  const createGithubSync = new GithubSync({
    global: requestBody.global,
    githubsync_instance_name: requestBody.githubsync_instance_name,
    github: {
      user_name: requestBody.github.user_name,
      repo_name: requestBody.github.repo_name
    }
  }); 
  const save = await createGithubSync.save();
  return save;
}

export const getGithubSyncService = async () => {
  const query = await GithubSync.find().sort({'global': -1}).exec();
  return query;
}

export const getOneGithubSyncService = async (paramsId: string) => {
  const query = await GithubSync.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  return query;
}

export const deleteOneGithubSyncService = async (paramsId: string) => {
  const query = await GithubSync.deleteOne({ _id: paramsId }).exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found for provided ID to be deleted');
  }
  return query;
}

export const updateOneGithubSyncService = async (paramsId: string, requestBody: GithubSyncDocument) => {
  const query = await GithubSync.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  if (Object.keys(requestBody).includes("global")) {
    badRequestErr('the global property update not allowed');
  }
  if (query.global === true && requestBody.githubsync_instance_name) {
    badRequestErr('global setting does not require app_name property');
  }
  const updatedQuery = await GithubSync.findOneAndUpdate({ _id: paramsId }, requestBody, { new: true }) // PATCH UPDATE
  return updatedQuery;
};