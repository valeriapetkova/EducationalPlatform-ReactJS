import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import AuthContext from '../../../contexts/authContext';
import useForm from '../../../hooks/useForm';
import * as topicService from '../../../services/topicService';

export default function TopicCreate() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [topics, setTopics] = useState([]);

    const { email } = useContext(AuthContext);

    const createTopicSubmitHandler = async (values) => {
        try {
            const newTopic = await topicService.create(courseId, values.title, values.description, values.date, values.time, values.link);

            setTopics(state => [...state, newTopic]);

            navigate(`/courses/${courseId}/topics`);
        } catch (error) {
            console.log(error); 
        }
    }

    const { values, onChange, onSubmit } = useForm(createTopicSubmitHandler, {
        title: '', 
        description: '', 
        date: '', 
        time: '', 
        link: '',
    });

    return (
        <>
             <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="title" onChange={onChange} value={values.title} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={2} name="description" onChange={onChange} value={values.description} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter date" name="date" onChange={onChange} value={values.date} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter time" name="time" onChange={onChange} value={values.time} required />
                </Form.Group>

                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Link</Form.Label>
                    <Form.Control type="text" placeholder="Enter link" name="link" onChange={onChange} value={values.link} required />
                </Form.Group>

                <Button variant="info" type="submit">Create</Button>
            </Form>
        </>
    );
}