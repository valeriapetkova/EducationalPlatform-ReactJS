import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ParticipantItem({ _id, firstName, lastName, role, username, email }) {

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Text>{firstName} {lastName}</Card.Text>
                    <Card.Text>{role}</Card.Text>
                    <Card.Text>{username}</Card.Text>
                    <Card.Text>{email}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}