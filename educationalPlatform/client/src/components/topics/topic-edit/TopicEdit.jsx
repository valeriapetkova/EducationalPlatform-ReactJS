import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as topicService from '../../../services/topicService';

export default function TopicEdit({ _id, title, description, date, time, link,  _ownerId }) {
    const navigate = useNavigate();
    const { courseId, topicId } = useParams();
    const [topic, setTopic] = useState({
        _id,
        title,
        description,
        date,
        time,
        link,
        _ownerId,
    });

    const topicDATE = topic.date?.split('T')[0];

    const editTopicSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await topicService.edit(courseId, _id, values.title, values.description, values.date, values.time, values.link);

            navigate(`/courses/${courseId}/topics`);
        } catch (error) {
            console.log(error); 
        }
    }

    const onChange = (e) => {
        setTopic(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }


    return (
            <>
                    <Form onSubmit={editTopicSubmitHandler}>
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                           <Form.Label>Title</Form.Label>
                           <Form.Control type="text" placeholder="Enter title" name="title" onChange={onChange} value={topic.title} required />
                       </Form.Group>
       
                       <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                           <Form.Label>Description</Form.Label>
                           <Form.Control as="textarea" rows={2} name="description" onChange={onChange} value={topic.description} required />
                       </Form.Group>
       
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                           <Form.Label>Date</Form.Label>
                           <Form.Control type="date" placeholder="Enter date" name="date" onChange={onChange} value={topicDATE} required />
                       </Form.Group>
       
                       <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                           <Form.Label>Time</Form.Label>
                           <Form.Control type="time" placeholder="Enter time" name="time" onChange={onChange} value={topic.time} required />
                       </Form.Group>
       
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                           <Form.Label>Link</Form.Label>
                           <Form.Control type="text" placeholder="Enter link" name="link" onChange={onChange} value={topic.link} required />
                       </Form.Group>
       
                       <Button variant="info" type="submit">Edit</Button>
                   </Form> 
            </>
    );
}