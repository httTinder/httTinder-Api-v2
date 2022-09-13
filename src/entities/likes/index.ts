import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { user } from "..";

@Entity("likes")
export class likes {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  receiver: string;

  @Column({ nullable: true})
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => user, (user) => user.likes, {
    onDelete: "CASCADE",
  })
  user: user;
}
