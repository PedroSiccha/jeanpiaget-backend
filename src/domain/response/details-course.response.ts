import { CourseRegistration } from "../entities/course-registration.entity";
import { Course } from "../entities/course.entity";
import { User } from "../entities/user.entity";

export class DetailsCourseResponse {

    course: Course;

    subscribe: CourseRegistration;

}