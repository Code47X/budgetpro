import { createParamDecorator } from 'type-graphql';
import { MyContext } from '../types';

export function CurrentUser() {
  return createParamDecorator<MyContext>(({ context }) => context.currentUser);
}
