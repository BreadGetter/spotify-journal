
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserProvider';
import Spinner from 'react-bootstrap/Spinner';


export default function TracksPage() {
    const { user } = useUser();
    const [trackNotes, setTrackNotes] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/${user.id}/tracks/notes`);
                if (response.ok) {
                    const results = await response.json();
                    setTrackNotes(results);
                    console.log(results);
                }
                else {
                    setTrackNotes(null);
                }
            }
            catch (error) {
                setTrackNotes(null);
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
                    {trackNotes === null ?
                        <p>Notes are being loaded...</p>
                        :
                        <>
                        {trackNotes === undefined ?                
                                <Spinner animation="border" />
                                :
                                    <>
                                        <h1>All Track Notes </h1>
                                        <ul>
                                            {trackNotes.map((note) => (
                                                <li key={note.id}>
                                                    <h2>{note.album_name} - {note.artist}</h2>
                                                    <h4>{note.track_name}</h4>
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

}