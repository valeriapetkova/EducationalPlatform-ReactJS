import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import * as commentService from '../../../services/commentService';

export default function CommentEdit({  commentData, handleModal, showModal }) {
    const navigate = useNavigate();
    const { _id, text, _ownerId } = commentData;
    const { courseId ,commentId } = useParams();
    const [comment, setComment] = useState({
        _id,
        text,
        _ownerId,
});

        // useEffect(() => {
        //     courseService.getOne(courseId)
        //             .then(result => {
        //                 setCourse(result);
        //             })
        //             .catch(error => {
        //                 console.log(error); // some error handling here
        //             });
        // }, [courseId]);

    const editCommentSubmitHandler = async (e) => {
        e.preventDefault();

         
        const values = Object.fromEntries(new FormData(e.currentTarget));
         
        try {
            await commentService.edit(courseId, _id, values);
            //  onSave(comment.text);
            handleModal(false);

            navigate(`/courses/${courseId}/comments`);
        } catch (error) {
            console.log(error); 
        }
    }

    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    return (
    <>
        {/* <Modal onHide={() => handleModal(false)}> */}
        <div className="modal">
            <Modal show={showModal} onHide={() => handleModal(false)}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Edit comment</Modal.Title>
        </Modal.Header> */}
                <Modal.Body>
                    <Form onSubmit={editCommentSubmitHandler}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Edit comment</Form.Label>
                            <Form.Control as="textarea" rows={2} name="text" onChange={onChange} value={comment.text} required />
                        </Form.Group>

                
                        <Button variant="info" type="submit" onClick={() => handleModal(false)}>Close</Button>
                        <Button variant="info" type="submit">Edit</Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    </>
    );
}