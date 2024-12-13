import mongoose from 'mongoose';

export interface GithubSyncDocument extends mongoose.Document {
  _id?: string;
  global: boolean;
  githubsync_instance_name?: string;
  github: {
    user_name: string;
    repo_name: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const collectionName = 'githubsync';

const GithubSyncSchema = new mongoose.Schema({
  global: { type: Boolean, default: false},
  githubsync_instance_name: { type: String },
  github: {
    user_name: { type: String, required: true },
    repo_name: { type: String, required: true }
  },
},
{
  timestamps: true,
});


const GithubSyncModel = mongoose.model<GithubSyncDocument>(collectionName, GithubSyncSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { GithubSyncModel };