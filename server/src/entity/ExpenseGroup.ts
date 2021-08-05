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
  readonly id: number;

  @Field()
  @Column()
  label: string;

  @ManyToOne(() => Budget, budget => budget.expenseGroups)
  budget: Budget;

  @Field(() => [Expense])
  @OneToMany(() => Expense, expense => expense.expenseGroup, { eager: true, cascade: ['insert'] })
  expenses: Expense[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
