import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class CategoryCourse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @OneToMany(() => Course, course => course.category)
    courses: Course[];

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