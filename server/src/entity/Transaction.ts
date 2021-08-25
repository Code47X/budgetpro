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
import { BudgetItem } from './BudgetItem';

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  //
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Budget, budget => budget.transactions)
  budget: Budget;
  @Column()
  budgetId: number;

  @ManyToOne(() => BudgetItem, budgetItem => budgetItem.transactions)
  budgetItem: BudgetItem;
  @Column()
  budgetItemId: number;

  @Field()
  @Column()
  amount: number; // Placeholder - TODO: decide how to handle storing currency amounts

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
