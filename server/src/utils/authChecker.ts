import { AuthChecker } from 'type-graphql';
import { MyContext } from '../types';

export const authChecker: AuthChecker<MyContext> = ({ context }, _roles) => {
  return !!context.currentUser;
};
