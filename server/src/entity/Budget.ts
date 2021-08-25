import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BudgetGroup } from './BudgetGroup';
import { Transaction } from './Transaction';
import { User } from './User';

@ObjectType()
@Entity()
@Index(['userId', 'month', 'year'], { unique: true })
export class Budget extends BaseEntity {
  //
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User, user => user.budgets)
  user: User;
  @Column()
  userId: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  month: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  year: number;

  @Field(() => [BudgetGroup])
  @OneToMany(() => BudgetGroup, budgetGroup => budgetGroup.budget, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  budgetGroups: BudgetGroup[];

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.budget)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
