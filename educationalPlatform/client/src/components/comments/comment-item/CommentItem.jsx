import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext, useState } from 'react';

import * as commentService from '../../../services/commentService'; 
import AuthContext from '../../../contexts/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import CommentEdit from '../comment-edit/CommentEdit';

export default function CommentItem({ _id, text, _ownerId }) {
    const navigate = useNavigate();
    const { userId, email } = useContext(AuthContext);
    const { courseId, commentId } = useParams();
    const [comments, setComments] = useState([]);
    const [editShow, setEditShow] = useState(false);
    const commentInfo = { _id, text, _ownerId};

    const deleteCommentClickHandler = async () => {
        try {
            await commentService.remove(courseId, _id);
    
            setComments(state => state.filter(c => c._id !== _id));
    
            navigate(`/courses/${courseId}/comments`);
        } catch (error) {
            console.log(error); 
        }
    }

    const onEditToggle = async (isOpen) => {
        setEditShow(isOpen);
    }
    
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Text>{email}</Card.Text>
                    <Card.Text>{text}</Card.Text>
                </Card.Body>
                {userId === _ownerId && (
                    <Card.Header>
                    <div>
                        <Button onClick={() => onEditToggle(true)} variant="info">Edit</Button>
                        <Button onClick={deleteCommentClickHandler} variant="info">Delete</Button>
                    </div>
                    </Card.Header>
                )}
            </Card>

            {editShow && (
                <CommentEdit commentData={commentInfo} handleModal={onEditToggle} showModal={editShow}/>
            )}
        </>
    );
}