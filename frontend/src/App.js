import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import AlbumsPage from './pages/AlbumsPage';
import Callback from './components/Callback';
import UserProvider from './contexts/UserProvider';
import AlbumNotesPage from './pages/AlbumNotesPage';  
import TrackNotesPage from './pages/TrackNotesPage';
import TracksPage from './pages/TracksPage';



export default function App() {

  return (
    <Container fluid className="App">
      <BrowserRouter>
          <UserProvider>
            <Header />
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/albums/:album_id" element={<AlbumPage />} />
              <Route path="/albums/notes" element={<AlbumsPage />} />
              <Route path="/tracks/notes" element={<TracksPage />} />
              <Route path="/albums/:album_id/notes" element={<AlbumNotesPage />} />
              <Route path="/albums/:album_id/tracks/:track_id/notes" element={<TrackNotesPage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/callback" element={<Callback />} />
            </Routes>
          </UserProvider>
      </BrowserRouter>
    </Container> 
      
        
  );
}




