import {Application} from 'express';
import passport from 'passport';
import { localLoginStrategy } from '@auth/passport/strategies/local.login.strategy';
import { localSignupStrategy } from '@auth/passport/strategies/local.signup.strategy';
import { jwtStrategy } from '@auth/passport/strategies/jwt.strategy';
import { googleStrategy } from '@auth/passport/strategies/google.strategy';
import { githubStrategy } from '@auth/passport/strategies/github.strategy';

export const configurePassport = (app: Application) => {
  passport.use('local-signup',localSignupStrategy); // basic signup with email and password
  passport.use('local-login',localLoginStrategy); // basic login with email and password
  passport.use(jwtStrategy); // used to extract bearer token 
  passport.use(googleStrategy); // signup and login with google Oauth2
  passport.use(githubStrategy); // signup and login with github Oauth2
  app.use(passport.initialize());
}