import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { Issue } from "./issue.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @ManyToOne(() => Course, course => course.sections)
    course: Course;

    @OneToMany(() => Issue, issue => issue.section)
    issues: Issue[];

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