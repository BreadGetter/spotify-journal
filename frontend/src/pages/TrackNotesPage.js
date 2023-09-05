
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import Spinner from 'react-bootstrap/Spinner';
import { useParams } from 'react-router-dom';


export default function NotePage() {

    // if album id is passed, fetch from @app.route('/api/albums/<int:user_id>/<int:album_id>/notes', methods=['GET'])
    // if track id is passed, fetch from /api/albums/<int:user_id>/<int:album_id>/<int:track_id>/notes

    const { album_id, track_id} = useParams();
    const { user } = useUser();
    const [notes, setNotes] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/albums/${user.id}/${album_id}/${track_id}/notes`);
                if (response.ok) {
                    const results = await response.json();
                    setNotes(results);
                    console.log(results);
                }
                else {
                    setNotes(null);
                }
            }
            catch (error) {
                setNotes(null);
                console.error('Error fetching user data:', error);
            }
            finally {
                setIsLoading(false);
            }
        })();
    }

    , [user, album_id]);

    return (
        <>
            {isLoading ? (
                <Spinner animation="border" />
            ) : (
                <>
                    {notes === null ?
                        <p>Notes are being loaded...</p>
                        :
                        <>
                        {notes === undefined ?
                            <Spinner animation="border" />
                            :
                            <>
                                <h1>Notes for {notes.album_name} - {notes.artist}</h1>
                                <ul>
                                    {notes.map((note) => (
                                        <li key={note.id}>
                                            <h2>{note.album_name} - {note.artist}</h2>
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