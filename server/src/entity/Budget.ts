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
import { IncomeGroup } from './IncomeGroup';
import { Transaction } from './Transaction';
import { User } from './User';

@ObjectType()
@Entity()
export class Budget extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column()
  userId: number;

  @Field()
  @Column()
  startDate: Date;

  @ManyToOne(() => User, user => user.budgets)
  user: User;

  @OneToMany(() => IncomeGroup, incomeGroup => incomeGroup.budget)
  incomeGroups: IncomeGroup[];

  @OneToMany(() => ExpenseGroup, expenseGroup => expenseGroup.budget)
  expenseGroups: ExpenseGroup[];

  @OneToMany(() => Transaction, transaction => transaction.budget)
  transactions: Transaction[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
