import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Logout from './Logout';
import Login from './Login';

export default function Header() {
    return (
        <Navbar bg="light" sticky="top" className="Header">
            <Container>
                <Navbar.Brand>Spotify journal</Navbar.Brand>
                <Login />
                <Logout />
            </Container>
        </Navbar>
    ); 
}