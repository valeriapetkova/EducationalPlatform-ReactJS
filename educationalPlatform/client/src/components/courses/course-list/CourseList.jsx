import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'; 

import AuthContext from '../../../contexts/authContext';
import * as courseService from '../../../services/courseService';
import CourseItem from '../course-item/CourseItem';

import styles from './CourseList.module.css';
import CommentList from '../../comments/comment-list/CommentList';

export default function CourseList() {
    const { role } = useContext(AuthContext);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        courseService.getAll(query)
            .then(result => {
                setCourses(result);
                setFilteredCourses(result);
            })
            .catch(error => {
                console.log(error); 
            });
        }, [query]);

        const searchHandler = (e) => {
            e.preventDefault();
            setQuery(e.target.value);
        }

        const handleCategoryChange = (category) => {

            if(category === 'All') {
                setFilteredCourses(courses);
            } else {
                const coursesByCategory = courses.filter(c => c.category === category);
    
                setFilteredCourses(coursesByCategory);
            }

        }

    return (
        <div>
            <div>
                <input type="text" placeholder="Search..." name="search" value={query} onChange={searchHandler}/>
            </div>

            <div className={styles.coursesContainer}>
                <h2>Courses</h2>

                 <div className={styles.categoriesNav}>
                    <Nav className="justify-content-center" variant="tabs" defaultActiveKey="/courses">
                        <Nav.Item>
                            <Nav.Link eventKey="link-0" onClick={() => handleCategoryChange('All')}>All courses</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1" onClick={() => handleCategoryChange('Front-End Development')}>Front-End Development</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2" onClick={() => handleCategoryChange('Back-End Development')}>Back-End Development</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-3" onClick={() => handleCategoryChange('Quality Assurance')}>Quality Assurance</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-4" onClick={() => handleCategoryChange('Business Intelligence')}>Business Intelligence</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-5" onClick={() => handleCategoryChange('Infrastructure')}>Infrastructure</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-6" onClick={() => handleCategoryChange('Data Science')}>Data Science</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-7" onClick={() => handleCategoryChange('Mobile Development')}>Mobile Development</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div> 
                
                {/* {filteredCourses.length > 0 ? (
                    filteredCourses.map(course => (
                        <CourseItem key={course._id} {...course} />
                    ))
                )
                    : (
                        <p>No courses found!</p>
                    )
                } */}

                {/* {courses.map(course => (
                    // to do: to import course list item
                    <CourseItem key={course._id} {...course} />
                ))}

                {courses.length === 0 && (
                    <h3>No courses yet</h3>
                )} */}

                {/* {role === 'TEACHER' && (
                    <div className={styles.createBtn}>+</div>
                )} */}
            </div>
        </div>
    );
}