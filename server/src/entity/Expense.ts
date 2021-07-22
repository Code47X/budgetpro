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
  id: number;

  @Field(() => ID)
  @Column()
  expenseGroupId: number;

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

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
