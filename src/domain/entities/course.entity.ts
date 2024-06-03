import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryCourse } from "./category-course.entity";
import { Section } from "./section.entity";
import { User } from "./user.entity";
import { CourseRegistration } from './course-registration.entity';

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    banner: string;

    @Column()
    duration: string;

    @Column()
    status: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    subTitle: string;

    @Column()
    cantQuestion: string;

    @Column()
    descQuestion: string;

    @Column()
    durationComplete: string;

    @Column()
    descDuration: string;

    @Column()
    award: string;

    @Column()
    descAward: string;

    @ManyToOne(() => CategoryCourse, category => category.courses)
    category: CategoryCourse;

    @OneToMany(() => Section, section => section.course)
    sections: Section[];

    @ManyToMany(() => User, user => user.courses)
    instructors: User[];

    @OneToMany(() => CourseRegistration, courseRegistration => courseRegistration.course)
    courseRegistrations: CourseRegistration[];

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