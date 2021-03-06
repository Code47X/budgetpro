import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { COOKIE_NAME } from '../../constants';
import { User } from '../../entity/User';
import { MyContext } from '../../types';
import { LoginInput } from './_inputs';
import { LoginPayload } from './_payloads';

@Resolver()
export class AuthResolver {
  //
  @Mutation(() => LoginPayload)
  async login(@Arg('input') { email, password }: LoginInput, @Ctx() { session }: MyContext) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    const validPassword = !!user && (await argon2.verify(user.password, password));

    if (user && validPassword) {
      session.userId = user.id;
      return { user };
    }

    return { error: { message: 'Invalid email or password' } };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise(resolve =>
      req.session.destroy(error => {
        res.clearCookie(COOKIE_NAME);

        if (error) {
          console.log(error);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
