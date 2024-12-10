import mongoose from 'mongoose';

export interface CollabocateDocument extends mongoose.Document {
  _id?: string;
  global: boolean;
  app_name?: string;
  github_username: string;
  repo_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const collectionName = 'collabocate';

const CollabocateSchema = new mongoose.Schema({
  global: { type: Boolean, default: false},
  app_name: {type: String},
  github_username: { type: String, required: true },
  repo_name: { type: String, required: true }
},
{
  timestamps: true,
});


const CollabocateModel = mongoose.model<CollabocateDocument>(collectionName, CollabocateSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { CollabocateModel };