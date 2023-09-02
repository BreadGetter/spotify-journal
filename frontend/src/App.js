import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Albums from './components/Albums';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AlbumPage from './pages/AlbumPage';



export default function App() {

  return (
    <Container fluid className="App">
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/:user_id" element={<HomePage />} />
            <Route path="/:user_id/albums/:album_id" element={<AlbumPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
    </Container> 
      
        
  );
}




