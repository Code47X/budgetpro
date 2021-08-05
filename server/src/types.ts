import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { User } from './entity/User';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export type MyContext = {
  req: Request;
  res: Response;
  session: Session & Partial<SessionData>;
  currentUser?: User;
};

export type Lazy<T extends object> = Promise<T> | T;
