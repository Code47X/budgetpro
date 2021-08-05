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
  readonly id: number;

  @Field()
  @Column()
  label: string;

  @ManyToOne(() => Budget, budget => budget.incomeGroups)
  budget: Budget;

  @Field(() => [Income])
  @OneToMany(() => Income, income => income.incomeGroup, { eager: true, cascade: ['insert'] })
  incomes: Income[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
