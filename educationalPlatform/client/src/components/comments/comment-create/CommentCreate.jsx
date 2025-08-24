import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import AuthContext from '../../../contexts/authContext';
import useForm from '../../../hooks/useForm';
import * as commentService from '../../../services/commentService';

export default function CommentCreate() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [comments, setComments] = useState([]);

    const { email } = useContext(AuthContext);

    const createCommentSubmitHandler = async (values) => {
        try {
            const newComment = await commentService.create(courseId, values.text);

            setComments(state => [...state, newComment]);

            values.text = '';

            navigate(`/courses/${courseId}/comments`);
        } catch (error) {
            console.log(error); 
        }
    }

    const { values, onChange, onSubmit } = useForm(createCommentSubmitHandler, {
        text: '',
    });

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add new comment</Form.Label>
                    <Form.Control as="textarea" rows={2} name="text" onChange={onChange} value={values.text} required />
                </Form.Group>

                <Button variant="info" type="submit">Add</Button>
            </Form>
        </>
    );
}