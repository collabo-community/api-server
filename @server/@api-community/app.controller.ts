import { Request, Response } from 'express';

export interface ApiInfo {
  name: string;
  description: string;
  built_at: string;
  github: {
    repository: string;
  };
  contributors: {
    count: number;
    list: string[];
  };
}

export const getAppController =  async (req: Request, res: Response) => {
    const apiInfo: ApiInfo = {
      name: 'Collabo Community backend API server',
      description: 'API server for the Collabo Community App and any other apps or libraries we build',
      built_at: 'Collabo Community',
      github: {
        repository: 'https://github.com/collabo-community/api-server',
      },
      contributors: {
        count: 4, // TODO: Dynamically get the list of contributors from GitHub
        list: ['Find list of contributors in project README: https://github.com/collabo-community/api-server?tab=readme-ov-file#contributors'],
      },
    };
    res.status(200).json(apiInfo);
}
