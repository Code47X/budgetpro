import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Budget } from './Budget';
import { Expense } from './Expense';

@ObjectType()
@Entity()
export class ExpenseGroup extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column()
  budgetId: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne(() => Budget, budget => budget.expenseGroups)
  budget: Budget;

  @OneToMany(() => Expense, expense => expense.expenseGroup)
  expenses: Expense[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
