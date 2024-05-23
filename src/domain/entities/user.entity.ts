import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { Rol } from './rol.entity';
import { Course } from './course.entity';
import { CourseRegistration } from './course-registration.entity';

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({
        unique: true
    })
    dni: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        unique: true
    })
    phone: string;

    @Column({
        nullable: true
    })
    image: string;

    @Column({
        nullable: true
    })
    notification_token: string;

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

    @JoinTable({
        name: 'user_has_roles',
        joinColumn: {
            name: 'id_user'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    @ManyToMany(() => Rol, (rol) => rol.users)
    roles: Rol[];

    @ManyToMany(() => Course, course => course.instructors)
    @JoinTable({
        name: 'instructor_has_courses',
        joinColumn: { name: 'id_user' },
        inverseJoinColumn: { name: 'id_course' }
    })
    courses: Course[];

    @OneToMany(() => CourseRegistration, courseRegistration => courseRegistration.user)
    courseRegistrations: CourseRegistration[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

}