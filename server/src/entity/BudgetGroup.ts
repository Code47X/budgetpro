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
import { BudgetItem } from './BudgetItem';

@ObjectType()
@Entity()
export class BudgetGroup extends BaseEntity {
  //
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  label: string;

  @ManyToOne(() => Budget, budget => budget.budgetGroups)
  budget: Budget;
  @Column()
  budgetId: number;

  @Field(() => [BudgetItem])
  @OneToMany(() => BudgetItem, budgetItem => budgetItem.budgetGroup, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  budgetItems: BudgetItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
