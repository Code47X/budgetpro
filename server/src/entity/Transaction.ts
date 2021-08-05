import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Budget } from './Budget';
import { Expense } from './Expense';
import { Income } from './Income';

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Budget, budget => budget.transactions)
  budget: Budget;
  @Column()
  budgetId: number;

  @ManyToOne(() => Income, income => income.transactions)
  income: Income;
  @Field(() => ID, { nullable: true })
  @RelationId((transaction: Transaction) => transaction.income)
  incomeId: number;

  @ManyToOne(() => Expense, expense => expense.transactions)
  expense: Expense;
  @Field(() => ID, { nullable: true })
  @RelationId((transaction: Transaction) => transaction.expense)
  expenseId: number;

  @Field()
  @Column()
  amount: number; // Placeholder - TODO: decide how to handle storing currency amounts

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
