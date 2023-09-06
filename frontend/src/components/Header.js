import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Logout from './Logout';
import Login from './Login';
import { useUser } from '../contexts/UserProvider';
import AlbumsPage from '../pages/AlbumsPage';

export default function Header() {
    const { user } = useUser();
    return (
        <Navbar bg="light" sticky="top" className="Header">
            <Container>
                <Navbar.Brand>Spotify journal</Navbar.Brand>
                {user === null ? (
                    <Login />
                ) : (
                    <div className="header-content">
                        <Link to="/home">Home</Link>
                        <Link to="/albums/notes">All Album Notes</Link>
                        <Link to="/tracks/notes">All Track Notes</Link>
                        <Logout />
                        <h5 className="username"> Hi, {user?.display_name}!</h5>
                        <img src={user?.image_url} width={50} height={50} />
                    </div>
                )}
            </Container>
        </Navbar>
    );
}