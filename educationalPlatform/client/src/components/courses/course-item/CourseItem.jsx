import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export default function CourseItem({
    _id,
    courseName,
    category,
    description,
    startDate,
    endDate,
}) {

    const startDATE = startDate?.split('T')[0].split('-').reverse().join('.');
    const endDATE = endDate?.split('T')[0].split('-').reverse().join('.');

    return (
            <Card>
                 <Card.Header as="h5">{category}</Card.Header>
                 <Card.Body>
                     <Card.Title>{courseName}</Card.Title>
                     {/* <Card.Text>{description}</Card.Text> */}
                     <Card.Text>Start date: {startDATE}</Card.Text>
                     <Card.Text>End date: {endDATE}</Card.Text>
                     {/* <Button variant="info">Join</Button> */}
                     <Button as={Link} to={`/courses/${_id}`} variant="info">Details</Button>
                 </Card.Body>
            </Card>
    );
}