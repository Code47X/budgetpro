import { IsInt, IsPositive, Max, Min } from 'class-validator';
import { Args, ArgsType, Authorized, Field, Int, Query, Resolver } from 'type-graphql';
import { CurrentUser } from '../../decorators/CurrentUser';
import { Budget } from '../../entity/Budget';
import { User } from '../../entity/User';

@ArgsType()
class BudgetArgs {
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(11)
  month: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  year: number;
}

@Resolver()
export class BudgetResolver {
  @Authorized()
  @Query(() => Budget, { nullable: true })
  async budget(@Args() { month, year }: BudgetArgs, @CurrentUser() user: User) {
    return await Budget.findOne({
      user,
      month,
      year,
    });
  }
}
