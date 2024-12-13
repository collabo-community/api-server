import 'express-async-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from '@lib/errors/ErrorHandler';
import { CustomErrorInterface } from '@lib/errors/CustomError';
import { notFoundErr } from '@lib/errors/Errors';
import { router as appRouter } from '@api-community/app.route';
import { router as githubRouter } from '@api-github/github.route';
import { router as authRouter } from '@auth/auth.route';
import { router as userRouter } from '@user/user.route';
import { router as githubsyncRouter } from '@githubsync/githubsync.route';
import { configurePassport } from '@auth/passport/passport.auth.config';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors({ origin: [`http://localhost:${process.env.CLIENT_APP_PORT}`, `${process.env.CLIENT_APP_URL}`] }));
configurePassport(app);

//====== Use Routers =======
app.use('/', appRouter);
app.use('/github', githubRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/githubsync', githubsyncRouter)
//==========================


//========= Throw Route Not Found Error ==========
app.use(() => {
  notFoundErr("Route Not Found")
});
//==========================================


//====== Error handler Middleware ==========
app.use((err: CustomErrorInterface, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
  next()
});
//==========================================

export { app };
