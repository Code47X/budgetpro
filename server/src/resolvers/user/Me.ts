import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { currentUser }: MyContext) {
    return currentUser;
  }
}
