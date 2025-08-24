import { useContext, useEffect, useState } from 'react';

import * as participantService from '../../services/participantService';
import { useParams } from 'react-router-dom';

import AuthContext from '../../contexts/authContext';
import ParticipantItem from './ParticipantItem';

export default function ParticipantList() {
    const [participants, setParticipants] = useState([]);
    const { courseId } = useParams();
    const { isAuthenticated, role } = useContext(AuthContext);

    useEffect(() => {
        participantService.getAll(courseId)
            .then(result => {
                setParticipants(result)
                console.log('participants', result);
            })
            .catch(error => {
                console.log(error); 
            });
    }, [courseId]);
    
    return (
        <div>
            <h2>Participants</h2>

            {participants.map(participant => (
                <ParticipantItem key={participant._id} {...participant} />
            ))}

            {participants.length === 0 && (
                <h3>No participants yet</h3>
            )}
        </div>
    );
}