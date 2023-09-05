import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Albums from './components/Albums';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AlbumPage from './pages/AlbumPage';
import Callback from './components/Callback';



export default function App() {

  return (
    <Container fluid className="App">
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/:user_id" element={<HomePage />} />
            <Route path="/:user_id/albums/:album_id" element={<AlbumPage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/callback" element={<Callback />} />

          </Routes>
      </BrowserRouter>
    </Container> 
      
        
  );
}




