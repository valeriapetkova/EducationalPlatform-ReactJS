import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import useForm from '../../../hooks/useForm';
import * as courseService from '../../../services/courseService';

export default function CourseCreate() {
    const navigate = useNavigate();

    const createCourseSubmitHandler = async (values) => {
        try {
            await courseService.create(values);

            navigate('/courses');
        } catch (error) {
            console.log(error); 
        }
    }

    const { values, onChange, onSubmit } = useForm(createCourseSubmitHandler, {
        courseName: '',
        category: 'Back-End Development',
        description: '',
        startDate: '',
        endDate: '',
    });

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter course name" name="courseName" onChange={onChange} value={values.courseName} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" placeholder="Choose category" name="category" onChange={onChange} value={values.category} required >
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
                    <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={values.description} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control type="date" placeholder="Enter start date" name="startDate" onChange={onChange} value={values.startDate} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>End date</Form.Label>
                    <Form.Control type="date" placeholder="Enter end date" name="endDate" onChange={onChange} value={values.endDate} required />
                </Form.Group>

                <Button variant="info" type="submit">Create</Button>
            </Form>
        </>
    );
}