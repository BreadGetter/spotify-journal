import React, { useState, useEffect } from 'react';
import './App.css';


export default function App() {

  // fetch data from '/api/albums/<int:user_id>' endpoint

  const [albums, setAlbums] = useState([]);

  // print the json response to the console

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/albums/1');
      const results = await response.json();
      setAlbums(results);
    })();
  }, []);





  return (
      <div className="App"> 
        <h1>Albums</h1>
        <ul>
          {albums.map(album => (
            <li key={album.id}>
              <h6>{album.title}</h6>
              <img src={album.cover_url} width={100} height={100}/> 
              <p>{album.artist}</p>
              <p>{album.release_date}</p>
            </li>
          ))}
        </ul>
      </div>
      
        
  );
}




