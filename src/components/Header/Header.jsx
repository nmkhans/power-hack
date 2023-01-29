import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useSignOut } from 'react-auth-kit'

const Header = () => {
    const logout = useSignOut()

    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/" >Power Hack</Navbar.Brand>
                    <Nav className="ms-auto flex align-items-center">
                        <div className="text-white">Paid Amount 00</div>
                        <Button 
                        onClick={() => logout()}variant="outline-primary ms-3">Logout</Button>
                    </Nav>
                </Container>
            </Navbar>
        </header>

    );
};

export default Header;