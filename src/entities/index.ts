import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Min } from "class-validator";
import { userAddresses } from "./user_address";
import { userAdditionalData } from "./user_aditional_data";
import { userProfile } from "./user_profile/index";
import { chat } from "./chat";
import { likes } from "./likes";
import { sessions } from "./sessions";

@Entity("user")
export class user {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  age: number;

  @Column()
  isActive?: boolean;

  @Column()
  isAdm?: boolean;

  @Column({nullable:true})
  location?: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => userAddresses, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  address: userAddresses;

  @OneToOne(() => userProfile, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  profile: userProfile;

  @OneToOne(() => userAdditionalData, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  userAdditionalData: userAdditionalData;

  @OneToMany(() => likes, (likes) => likes.user, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  likes: likes[];

  @OneToMany(() => sessions, (sessions) => sessions.user, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  sessions: sessions[];

  @OneToMany(() => chat, (chat) => chat.user, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  chat: chat[];
}
