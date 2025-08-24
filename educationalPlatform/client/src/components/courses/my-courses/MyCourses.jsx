import { useEffect, useState } from 'react';
import { useContext } from "react";

import AuthContext from '../../../contexts/authContext';
import * as courseService from '../../../services/courseService';
import CourseItem from '../course-item/CourseItem';

import styles from '../course-list/CourseList.module.css';

export default function MyCourses() {
    const { role } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        courseService.getMyCourses()
            .then(result => setCourses(result))
            .catch(error => {
                console.log(error); 
            });
    }, []);

    return (
        <div>
            <div className={styles.coursesContainer}>
                <h2>Courses</h2>

                {courses.map(course => (
                    <CourseItem key={course._id} {...course} />
                ))}

                {courses.length === 0 && (
                    <h3>No courses yet</h3>
                )}

                {/* {role === 'TEACHER' && (
                    <div className={styles.createBtn}>+</div>
                )} */}
            </div>
        </div>
    );
}