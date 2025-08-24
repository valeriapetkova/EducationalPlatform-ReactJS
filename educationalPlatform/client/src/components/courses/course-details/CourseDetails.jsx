import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import * as courseService from '../../../services/courseService';
import * as participantService from '../../../services/participantService';
import AuthContext from '../../../contexts/authContext';
import CommentList from '../../comments/comment-list/CommentList';

export default function CourseDetails() {
    const navigate = useNavigate();
    const [course, setCourse] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const { courseId } = useParams();
    const { userId, isAuthenticated, role } = useContext(AuthContext);

    useEffect(() => {
        courseService.getOne(courseId)
            .then((result) => {
                setCourse(result)
                const hasJoinedUser = result.participants.includes(userId);
                setIsJoined(hasJoinedUser)
            })
            .catch(error => {
                console.log(error); 
            });
    }, [courseId]);

    const deleteButtonClickHandler = async () => {
        // console.log(course);
            const hasConfirmed = confirm('Are you sure you want to delete this course?');

            if (hasConfirmed) {
                await courseService.remove(courseId);

                navigate('/courses');
            }
    }

    const joinButtonClickHandler = async () => {
        await participantService.joinCourse(courseId);

        setIsJoined(true);

        navigate(`/courses/${courseId}`);
    }

    const startDATE = course.startDate?.split('T')[0].split('-').reverse().join('.');
    const endDATE = course.endDate?.split('T')[0].split('-').reverse().join('.');    

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{course.courseName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{course.category}</Card.Subtitle>
                    <Card.Text>Start date: {startDATE}</Card.Text>
                    <Card.Text>End date: {endDATE}</Card.Text>
                    <Card.Text>{course.description}</Card.Text>

                    {/* <Participants {...course} /> */}

                    {userId === course._ownerId && (
                        <div>
                            <Button as={Link} to={`/courses/${courseId}/edit`} variant="info">Edit</Button>
                            <Button variant="info" onClick={deleteButtonClickHandler}>Delete</Button>
                        </div>
                    )}

                    {isAuthenticated && role === 'Student' && !isJoined && (
                        <Button variant="info" onClick={joinButtonClickHandler}>Join</Button>
                    )}

                    {isAuthenticated && role === 'Student' && isJoined && (
                        <div>
                            <p>You are already enrolled in this course!</p>
                            {/* <p>All participants: </p> */}
                            {/* {course.participants.map(p => (
                                <p>{{ p }}</p>
                            ))} */}
                        </div>
                    )}


                </Card.Body>
                    {isAuthenticated && (
                        <>
                        <Button as={Link} to={`/courses/${courseId}/comments`} variant="info">Comments</Button>
                        <Button as={Link} to={`/courses/${courseId}/topics`} variant="info">Topics</Button>
                        {/* {role === 'Teacher' && (
                            <Button as={Link} to={`/courses/${courseId}/participants`} variant="info">Participants</Button>
                        )} */}
                            <Button as={Link} to={`/courses/${courseId}/participants`} variant="info">Participants</Button>
                        </>

                        // <CommentList {...course} />
                    )}
            </Card>
        </>
    );
}