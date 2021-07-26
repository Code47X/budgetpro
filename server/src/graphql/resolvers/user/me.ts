import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { MyContext } from '../../../types';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return undefined;
    }

    const user = await User.findOne(req.session.userId);
    return user;
  }
}
