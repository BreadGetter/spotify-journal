import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Album from "./Album";



export default function Albums({ user_id }) {
    const [albums, setAlbums] = useState();

    // print the json response to the console

    useEffect(() => {
    (async () => {
        const response = await fetch(`/api/albums/${user_id}`);
        if (response.ok) {
            const results = await response.json();
            setAlbums(results);
          }
          else {
            setAlbums(null);
          }
        })();
      }, []);





      return (
        <>
            <h1>Your Albums</h1>
            {albums === undefined ?
                <Spinner animation="border" />
                :
                <>
                    {albums === null ?
                        <p>Could not retrieve albums.</p>
                        :
                        <>
                            {albums.length === 0 ?
                                <p>There are no albums in your library.</p>
                                :
                                <ul class="album-list">
                                    {albums.map(album => <Album key={album.id} album={album} />)}
                                </ul>
                            }
                        </>
                    }
                </>
            }
        </>
    );
}