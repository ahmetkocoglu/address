import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

enum type { JOB = 'iş', HOME = 'ev' };

@Entity()
export class Email {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: type, default: type.HOME })
    emailType: type

    @Column()
    emailAddress: string

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User
}
