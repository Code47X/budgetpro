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
import { IncomeGroup } from './IncomeGroup';
import { Transaction } from './Transaction';

@ObjectType()
@Entity()
export class Income extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  plannedAmount: number; // Placeholder - TODO: decide how to handle storing currency amounts

  @ManyToOne(() => IncomeGroup, incomeGroup => incomeGroup.incomes)
  incomeGroup: IncomeGroup;

  @OneToMany(() => Transaction, transaction => transaction.income)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
