import { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Album from "./Album";
import { useUser } from '../contexts/UserProvider';


export default function Albums() {
    const [albums, setAlbums] = useState();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);

    // print the json response to the console

    useEffect(() => {
    (async () => {
            try {
                const response = await fetch(`/api/albums/${user.id}`);
                if (response.ok) {
                    const results = await response.json();
                    setAlbums(results);
                }
                else {
                    setAlbums(null);
                }
            }
            catch (error) {
                setAlbums(null);
                console.error('Error fetching user data:', error);
            }
            finally {
                setIsLoading(false);
            }
        })();
      }, [user]);





      return (
        <>
            <h1>Your Albums</h1>
            {isLoading ? (
                <Spinner animation="border" />
            ) : (
                <>
                    {albums === undefined ?
                        <Spinner animation="border" />
                        :
                        <>
                            {albums === null ?
                                <p>Albums being retrieved.</p>
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
            )}
        </>
    );
}