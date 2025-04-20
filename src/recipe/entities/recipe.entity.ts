import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Instruction } from './instruction.entity';
import { Tag } from './tag.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  imgUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  ingredients: Ingredient[];

  @OneToMany(() => Instruction, (instruction) => instruction.recipe, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  instructions: Instruction[];

  @ManyToMany(() => Tag, (tag) => tag.recipes)
  @JoinTable({ name: 'recipe_tag' })
  tags: Tag[];
}
