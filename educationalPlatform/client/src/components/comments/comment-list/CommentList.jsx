import { useEffect, useState } from 'react';

import * as commentService from '../../../services/commentService';
import CommentItem from '../comment-item/CommentItem';
import CommentCreate from '../comment-create/CommentCreate';
import { useParams } from 'react-router-dom';

export default function CommentList() {
    const [comments, setComments] = useState([]);
    const { courseId } = useParams();

    useEffect(() => {
        commentService.getAll(courseId)
            .then(result => setComments(result))
            .catch(error => {
                console.log(error);
            });
    }, [courseId]);
    
    return (
        <div>
            <h2>Comments</h2>

            {/* {comments.map(comment => (
                <CommentItem key={comment._id} {...comment} />
            ))} */}

            {comments.length === 0 && (
                <h3>No comments yet</h3>
            )}

            {/* <CommentCreate /> */}
        </div>
    );
}