import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useContext } from "react";

import AuthContext from '../../contexts/authContext';

export default function Header() {
    const { isAuthenticated, username, userId, role } = useContext(AuthContext);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">EPlatform</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                    {isAuthenticated ? (
                        <>
                            {/* to do: to add ternary operator for create a course - it has to be visible only for teachers */}
                            {/* {role === 'Teacher' && (
                                <Nav.Link as={Link} to="/courses/create">Create a course</Nav.Link>
                            )} */}
                            <Nav.Link as={Link} to="/courses/create">Create a course</Nav.Link>
                            <Nav.Link as={Link} to="/courses/my-courses">My Courses</Nav.Link>
                            <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    )
                        : (
                        <>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                        )
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}