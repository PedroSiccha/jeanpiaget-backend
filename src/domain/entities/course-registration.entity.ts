import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Course } from "./course.entity";

@Entity()
export class CourseRegistration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateRegistration: Date;

    @Column()
    status: boolean;

    @ManyToOne(() => User, user => user.courseRegistrations)
    user: User;

    @ManyToOne(() => Course, course => course.courseRegistrations)
    course: Course;
}