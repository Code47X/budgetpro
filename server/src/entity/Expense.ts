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
import { ExpenseGroup } from './ExpenseGroup';
import { Transaction } from './Transaction';

@ObjectType()
@Entity()
export class Expense extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  plannedAmount: number; // Placeholder - TODO: decide how to handle storing currency amounts

  @ManyToOne(() => ExpenseGroup, expenseGroup => expenseGroup.expenses)
  expenseGroup: ExpenseGroup;

  @OneToMany(() => Transaction, transaction => transaction.expense)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
