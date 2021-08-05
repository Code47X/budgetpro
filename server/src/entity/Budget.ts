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
import { Lazy } from '../types';
import { ExpenseGroup } from './ExpenseGroup';
import { IncomeGroup } from './IncomeGroup';
import { Transaction } from './Transaction';
import { User } from './User';

@ObjectType()
@Entity()
@Index(['userId', 'month', 'year'], { unique: true })
export class Budget extends BaseEntity {
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

  @Field(() => [IncomeGroup])
  @OneToMany(() => IncomeGroup, incomeGroup => incomeGroup.budget, {
    lazy: true,
    cascade: ['insert'],
  })
  incomeGroups: Lazy<IncomeGroup[]>;

  @Field(() => [ExpenseGroup])
  @OneToMany(() => ExpenseGroup, expenseGroup => expenseGroup.budget, {
    lazy: true,
    cascade: ['insert'],
  })
  expenseGroups: Lazy<ExpenseGroup[]>;

  @Field(() => [Transaction])
  @OneToMany(() => Transaction, transaction => transaction.budget, { lazy: true })
  transactions: Lazy<Transaction[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
