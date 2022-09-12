import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { user } from "..";

@Entity("chat")
export class chat {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  receiver: string;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => user, (user) => user.chat)
  user: user;
}
