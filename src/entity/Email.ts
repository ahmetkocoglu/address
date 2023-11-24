import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

enum type { HOME = 'ev', CENTER = 'centre', BRANCH = 'branch' };

@Entity()
export class Email {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: type, default: type.HOME })
    emailType: type

    @Column({type: 'varchar', length: 100})
    emailAddress: string

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User
}
