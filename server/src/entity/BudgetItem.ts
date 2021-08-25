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
import { BudgetGroup } from './BudgetGroup';
import { Transaction } from './Transaction';

@ObjectType()
@Entity()
export class BudgetItem extends BaseEntity {
  //
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  plannedAmount: number; // Placeholder - TODO: decide how to handle storing currency amounts

  @ManyToOne(() => BudgetGroup, budgetGroup => budgetGroup.budgetItems)
  budgetGroup: BudgetGroup;
  @Column()
  budgetGroupId: number;

  @OneToMany(() => Transaction, transaction => transaction.budgetItem)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
