import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as authService from '../../services/authService';
import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

import styles from './Register.module.css';

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        firstName: '',
        lastName: '',
        role: 'Student',
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    return (
        <>
            <div className={styles.authContainer}>
                <div className={styles.registerContainer}>
                    <h2>Register</h2>

                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your first name" name="firstName" onChange={onChange} value={values.firstName} required />
                            {/* <Form.Text className="text-muted">
                            Your first name should be at least 2 characters long!
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your last name" name="lastName" onChange={onChange} value={values.lastName} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" placeholder="Your role" name="role" onChange={onChange} value={values.role} required >
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" onChange={onChange} value={values.username} required />
                            <Form.Text className="text-muted">
                            Your username should be at least 5 characters long
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={values.email} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} value={values.password} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat password" name="repeatPassword" onChange={onChange} value={values.repeatPassword} required />
                        </Form.Group>
                        
                        <Button variant="info" type="submit" className={styles.regBtn}>
                            Register
                        </Button>
                    </Form>
                </div>

                <div className={styles.loginInfo}>
                        <h4>LOGIN</h4>
                        <p>Already have profile?</p>
                        <p><Link to="/login" className={styles.lgBtn}>Click here</Link></p>    
                </div>
            </div>
        </>
    );
}