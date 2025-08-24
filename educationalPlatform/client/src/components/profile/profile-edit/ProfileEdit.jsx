import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import * as authService from '../../../services/authService';
import AuthContext from '../../../contexts/authContext';

export default function ProfileEdit() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',

    });

    const { userId } = useContext(AuthContext);

    useEffect(() => {
        authService.getUserEditInfo()
            .then(result => setUserData(result))
            .catch(error => {
                console.log(error); // some error handling here
            });
    }, []);

    const editUserSubmitHandler = async (e) => {
        e.preventDefault();
         
        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await authService.updateUser(values);

            navigate(`/profile`);
        } catch (error) {
            console.log(error); 
        }
    };

    const onChange = (e) => {
        setUserData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(e.target.value);
    };

    return (
        <div>
            <Form onSubmit={editUserSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                     <Form.Label>First Name</Form.Label>
                     <Form.Control type="text" placeholder="Enter your first name" name="firstName" onChange={onChange} value={userData.firstName} required />
                     <Form.Text className="text-muted">
                        Your first name should be at least 2 characters long!
                     </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                     <Form.Label>Last Name</Form.Label>
                     <Form.Control type="text" placeholder="Enter your last name" name="lastName" onChange={onChange} value={userData.lastName} required />
                     {/* <Form.Text className="text-muted">
                     Some info here
                     </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                     <Form.Label>Username</Form.Label>
                     <Form.Control type="text" placeholder="Enter username" name="username" onChange={onChange} value={userData.username} required />
                     {/* <Form.Text className="text-muted">
                     Some info here
                     </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Email</Form.Label>
                     <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={userData.email} required />
                     {/* <Form.Text className="text-muted">
                     Some info here
                     </Form.Text> */}
                </Form.Group>
                
                <Button variant="info" type="submit">Edit</Button>
            </Form>
        </div>
    );
}