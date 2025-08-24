import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import CourseItem from "../courses/course-item/CourseItem";
import * as courseService from '../../services/courseService';
import styles from './Home.module.css';

export default function Home() {
    const { isAuthenticated, email } = useContext(AuthContext);
    const [popularCourses, setPopularCourses] = useState([]); 

    useEffect(() => {
        courseService.getPopularCourses()
            .then(result => {
                console.log(result);
                setPopularCourses(result)
            })
            .catch(err => {
                console.log(err); 
            });
    }, [])

    return (
        <>
            <div className={styles.homeContainer}>

                <section className={styles.generalInfo}>
                    <div className={styles.generalContainer}>
                
                        <div className={styles.mainText}>
                            <h2>Join different IT courses and learn new things</h2>
                            <p>Explore exciting courses in your favorite categories, challenge yourself and show your full potential</p>
                            <h3><Link to="/register" className={styles.regBtn}>Register</Link> <Link to="/login" className={styles.lgBtn}>Login</Link></h3>
                        </div>

                        <div className={styles.categories}>
                            <li>Front-End Development</li>
                            <li>Back-End Development</li>
                            <li>Quality Assurance</li> 
                            <li>Business Intelligence</li> 
                            <li>Infrastructure</li>  
                            <li>Data Science</li>  
                            <li>Mobile Development</li> 
                        </div>
                    </div>
                </section>

                <section className={styles.moreInfo}>
                    <div className={styles.textContainer}>
                        <p>Learn online from anywhere</p>
                        <p>Meet people with similar interests</p>
                        <p>Continuously develop your skills</p>
                    </div>
                </section>

                <section className={styles.popularCourses}>
                    <div className={styles.coursesContainer}>
                        <h3>The most popular courses</h3>

                        {popularCourses.map(course => (
                            <CourseItem key={course._id} {...course} />
                        ))}
                        
                        {popularCourses.length === 0 && (
                            <h4>There are no courses available yet</h4>
                        )}

                        <h4><Link to="/courses" className={styles.allCourses}>See all courses</Link></h4>
                    </div>
                </section>
            </div>
        </>
    );
}