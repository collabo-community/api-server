import mongooseConnect from '@server/db.connect';
import { app as app } from '@server/app';
import dotenv from 'dotenv';

dotenv.config();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  mongooseConnect(port);
});

