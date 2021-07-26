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
import { Income } from './Income';

@ObjectType()
@Entity()
export class IncomeGroup extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ID)
  @Column()
  budgetId: number;

  @Field()
  @Column()
  label: string;

  @ManyToOne(() => Budget, budget => budget.incomeGroups)
  budget: Budget;

  @OneToMany(() => Income, income => income.incomeGroup, { cascade: ['insert'] })
  incomes: Income[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
