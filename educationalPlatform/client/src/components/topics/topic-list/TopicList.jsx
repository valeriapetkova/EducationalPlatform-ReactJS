import { useContext, useEffect, useState } from 'react';

import * as topicService from '../../../services/topicService';
import TopicItem from '../topic-item/TopicItem';
import TopicCreate from '../topic-create/TopicCreate';
import { useParams } from 'react-router-dom';

import AuthContext from '../../../contexts/authContext';

export default function TopicList() {
    const [topics, setTopics] = useState([]);
    const { courseId } = useParams();
    const { isAuthenticated, role } = useContext(AuthContext);

    useEffect(() => {
        topicService.getAll(courseId)
            .then(result => {
                setTopics(result)
            })
            .catch(error => {
                console.log(error); 
            });
    }, [courseId]);
    
    return (
        <div>
            <h2>Topics</h2>

            {topics.map(topic => (
                <TopicItem key={topic._id} {...topic} />
            ))}

            {topics.length === 0 && (
                <h3>No topics yet</h3>
            )}

            <TopicCreate />
        </div>
    );
}
