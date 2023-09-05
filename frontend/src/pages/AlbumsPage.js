
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserProvider';
import Spinner from 'react-bootstrap/Spinner';


export default function AlbumsPage() {
    const { user } = useUser();
    const [albumNotes, setAlbumNotes] = useState();
    const [isLoading, setIsLoading] = useState(true);


    // get all notes from all albums from api/user_id/albums/notes


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/${user.id}/albums/notes`);
                if (response.ok) {
                    const results = await response.json();
                    setAlbumNotes(results);
                    console.log(results);
                }
                else {
                    setAlbumNotes(null);
                }
            }
            catch (error) {
                setAlbumNotes(null);
                console.error('Error fetching user data:', error);
            }
            finally {
                setIsLoading(false);
            }
        })();
    }, [user]);

    return (
        <>
            {isLoading ? (
                <Spinner animation="border" />
            ) : (
                <>
                    {albumNotes === null ?
                        <p>Notes are being loaded...</p>
                        :
                        <>
                        {albumNotes === undefined ?                
                                <Spinner animation="border" />
                                :
                                    <>
                                        <h1>All Album Notes </h1>
                                        <ul>
                                            {albumNotes.map((note) => (
                                                <li key={note.id}>
                                                    <h2>{note.album_name} - {note.artist}</h2>
                                                    <img src={note.cover_url} width={50} height={50}/>
                                                    <p>{note.content} - {note.timestamp}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                        }
                        </>
                    }
                </>
            )}
        </>
    );



        
    // get all notes from all albums 

}