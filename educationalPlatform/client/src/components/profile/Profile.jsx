import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import * as authService from '../../services/authService';
import AuthContext from '../../contexts/authContext';

export default function Profile() {
    const [userData, setUserData] = useState([]);

    const { userId } = useContext(AuthContext);

    useEffect(() => {
        authService.getUser()
            .then(result => setUserData(result))
            .catch(error => {
                console.log(error); 
            });
    }, []);

    return (
        <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{userData.user?.firstName} {userData.user?.lastName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{userData.user?.role}</Card.Subtitle>
                        <Card.Text>{userData.user?.username}</Card.Text>
                        <Card.Text>{userData.user?.email}</Card.Text>
                    
                        <Button as={Link} to={`/profile/edit`} variant="info">Edit</Button>
                    </Card.Body>
                </Card>
        </div>
    );
}