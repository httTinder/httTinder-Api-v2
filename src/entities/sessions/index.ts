import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { user } from "..";

@Entity("sessions")
export class sessions {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        () => user,
        (user) => user.sessions
    )
    user: user
}