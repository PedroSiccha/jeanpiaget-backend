import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Issue } from "./issue.entity";

@Entity()
export class Media {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    url: string;

    @Column()
    status: boolean;

    @ManyToOne(() => Issue, issue => issue.media)
    issue: Issue;

    @Column({
        type: 'datetime', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date;
    
    @Column({
        type: 'datetime', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at: Date;
}