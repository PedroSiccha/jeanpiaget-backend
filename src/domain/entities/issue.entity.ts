import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";
import { Media } from "./media.entity";

@Entity()
export class Issue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @ManyToOne(() => Section, section => section.issues)
    section: Section;

    @OneToMany(() => Media, media => media.issue)
    media: Media[];

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