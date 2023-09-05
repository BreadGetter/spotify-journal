import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Logout from './Logout';
import Login from './Login';
import { useUser } from '../contexts/UserProvider';

export default function Header() {
    const { user } = useUser();
    return (
        <Navbar bg="light" sticky="top" className="Header">
            <Container>
                <Navbar.Brand>Spotify journal</Navbar.Brand>
                { user === null ? <Login /> : (
                    <>
                        <Link to="/home">Home</Link>
                        <Logout />
                        <h5 className="username">{user?.display_name}</h5>
                        <img src={user?.image_url} width={50} height={50}/>
                    </>
                )}
            </Container>
        </Navbar>
    ); 
}