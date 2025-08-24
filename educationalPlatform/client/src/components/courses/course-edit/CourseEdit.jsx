import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as courseService from '../../../services/courseService';

export default function CourseEdit() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [course, setCourse] = useState({
        courseName: '',
        category: '',
        description: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        courseService.getOne(courseId)
                .then(result => {
                    setCourse(result);
                })
                .catch(error => {
                    console.log(error);
                });
    }, [courseId]);

    const editCourseSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await courseService.edit(courseId, values);

            navigate('/courses');
        } catch (error) {
            console.log(error); 
        }
    }

    const onChange = (e) => {
        setCourse(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    const startDATE = course.startDate?.split('T')[0];
    const endDATE = course.endDate?.split('T')[0];   

    return (
        <>
            <Form onSubmit={editCourseSubmitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter course name" name="courseName" onChange={onChange} value={course.courseName} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" placeholder="Choose category" name="category" onChange={onChange} value={course.category} required >
                        <option value="Front-End Development">Front-End Development</option>
                        <option value="Back-End Development">Back-End Development</option>
                        <option value="Quality Assurance">Quality Assurance</option>
                        <option value="Business Intelligence">Business Intelligence</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Mobile Development">Mobile Development</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={course.description} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control type="date" placeholder="Enter start date" name="startDate" onChange={onChange} value={startDATE} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>End date</Form.Label>
                    <Form.Control type="date" placeholder="Enter end date" name="endDate" onChange={onChange} value={endDATE} required />
                </Form.Group>

                <Button variant="info" type="submit">Edit</Button>
            </Form>
        </>
    );
}