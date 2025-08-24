import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext, useState } from 'react';

import * as topicService from '../../../services/topicService'; 
import AuthContext from '../../../contexts/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import TopicEdit from '../topic-edit/TopicEdit';

export default function TopicItem({ _id, title, description, date, time, link,  _ownerId }) {
    const navigate = useNavigate();
    const { userId, email } = useContext(AuthContext);
    const { courseId, topicId } = useParams();
    const [topics, setTopics] = useState([]);
    const [editShow, setEditShow] = useState(false);
    const topicInfo = { _id, title, description, date, time, link, _ownerId};

    const deleteTopicClickHandler = async () => {
            try {
                await topicService.remove(courseId, _id);
    
                setTopics(state => state.filter(t => t._id !== _id));
    
                navigate(`/courses/${courseId}/topics`);
            } catch (error) {
                console.log(error); 
            }
        }

        const onEditToggle = async () => {
            setEditShow(true);
        }

        const topicDATE = date.split('T')[0].split('-').reverse().join('.');
    
 return (
    <>
    <Card style={{ width: '18rem' }}>
             <Card.Body>
                 <Card.Text>{email}</Card.Text>
                 <Card.Text>{title}</Card.Text>
                 <Card.Text>{description}</Card.Text>
                 <Card.Text>{topicDATE}</Card.Text>
                 <Card.Text>{time}</Card.Text>
                 <Card.Text>{link}</Card.Text>
             </Card.Body>
                    {userId === _ownerId && (
                        <Card.Header>
                        <div>
                            <Button onClick={onEditToggle} variant="info">Edit</Button>
                            <Button onClick={deleteTopicClickHandler} variant="info">Delete</Button>
                        </div>
                        </Card.Header>
                    )}
    </Card>

            {editShow && (
                <TopicEdit {...topicInfo} />
            )}
    </>
    );
}