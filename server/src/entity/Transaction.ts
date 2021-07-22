import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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
  id: number;

  @Field(() => ID)
  @Column()
  budgetId: number;

  @Field(() => ID)
  @Column({ nullable: true })
  incomeId: number;

  @Field(() => ID)
  @Column({ nullable: true })
  expenseId: number;

  @Field()
  @Column()
  amount: number; // Placeholder - TODO: decide how to handle storing currency amounts

  @ManyToOne(() => Budget, budget => budget.transactions)
  budget: Budget;

  @ManyToOne(() => Income, income => income.transactions)
  income: Income;

  @ManyToOne(() => Expense, expense => expense.transactions)
  expense: Expense;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
