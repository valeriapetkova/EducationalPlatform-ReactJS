import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

import styles from './Login.module.css';

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
     
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        email: '',
        password: '',
    });

    return (
        <>
            <div className={styles.authContainer}>
                <div className={styles.loginContainer}>
                    <h2>Login</h2>

                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={values.email} required />
                        </Form.Group>
                
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} value={values.password} required />
                        </Form.Group>
                                
                        <Button variant="info" type="submit" className={styles.lgBtn}>
                            Login
                        </Button>
                    </Form>
                </div>
            
                <div className={styles.registerInfo}>
                    <h4>REGISTER</h4>
                    <p>Don't have an account?</p> 
                    <p><Link to="/register" className={styles.regBtn}>Click here</Link></p> 
                </div>
            </div>
         </>
    );
}