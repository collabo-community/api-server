import { badRequestErr, notFoundErr } from '@lib/errors/Errors';
import { CollabocateDocument, CollabocateModel as Collabocate } from '@collabocate/collabocate.model';


export const createCollabocateService = async (requestBody: CollabocateDocument): Promise<CollabocateDocument> => {
  if (Object.keys(requestBody).includes("global") && requestBody.global === true) {
    const query = await Collabocate.findOne({global: true}).exec();
    if(query){
      badRequestErr('A global setting already exists, Only One Global Setting can exist');
    }
    if (requestBody.app_name) {
    badRequestErr('global setting does not require app_name property');
    }
  }

  const createCollabocate = new Collabocate({
    global: requestBody.global,
    app_name: requestBody.app_name,
    github_username: requestBody.github_username,
    repo_name: requestBody.repo_name,
  }); 
  const save = await createCollabocate.save();
  return save;
}

export const getCollabocateService = async () => {
  const query = await Collabocate.find().exec();
  return query;
}

export const getOneCollabocateService = async (paramsId: string) => {
  const query = await Collabocate.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  return query;
}

export const deleteOneCollabocateService = async (paramsId: string) => {
  const query = await Collabocate.deleteOne({ _id: paramsId }).exec();
  if (query.deletedCount < 1){
    notFoundErr('No record found for provided ID to be deleted');
  }
  return query;
}

export const updateOneCollabocateService = async (paramsId: string, requestBody: CollabocateDocument) => {
  const query = await Collabocate.findById(paramsId).exec();
  if(!query){
    notFoundErr('No record found for provided ID');
  }
  if (Object.keys(requestBody).includes("global")) {
    badRequestErr('the global property update not allowed');
  }
  if (query.global === true && requestBody.app_name) {
    badRequestErr('global setting does not require app_name property');
  }
  const updatedQuery = await Collabocate.findOneAndUpdate({ _id: paramsId }, requestBody, { new: true }) // PATCH UPDATE
  return updatedQuery;
};