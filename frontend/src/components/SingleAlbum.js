
import { useState, useEffect } from "react";
import Album from "./Album";
import Spinner from 'react-bootstrap/Spinner';
import Track from "./Track";
import NoteForm from "./NoteForm";
import { useUser } from '../contexts/UserProvider';
import { Link } from "react-router-dom";



export default function SingleAlbum({ album_id }) {
    const { user } = useUser();
    const [album, setAlbum] = useState();
    const [tracks, setTracks] = useState();
    const [note, setNote] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    (async () => {
        try {
            const response = await fetch(`/api/albums/${user.id}/${album_id}`);
            if (response.ok) {
                const results = await response.json();
                setAlbum(results);
                setTracks(results.tracks);
                console.log(results);
                setNote(results.note);
            }
            else {
                setTracks(null);
                setNote(null);
            }
        }
        catch (error) {
            setTracks(null);
            setNote(null);
            console.error('Error fetching user data:', error);
        }
        finally {
            setIsLoading(false);
        }

    })();
    }, [user, album, tracks, note]);

      
    
      return (
        <>
        {isLoading ? (
            <Spinner animation="border" />
        ) : (
            <>
                {album === undefined ? 
                    <Spinner animation="border" />
                    :
                    <>
                        <h1>{album.title} - {album.artist} - {album.release_date}</h1>
                        <img src={album.cover_url} width={200} height={200}/>
                        {note === null ?
                            <p>There are no notes for this album.</p>
                            :
                            <>
                            { note === undefined ?
                                <Spinner animation="border" />
                                :
                                <>
                                    <div className="album-note">
                                        <h3>Album Note</h3>
                                        <p>{note.content}</p>
                                        <p>{note.timestamp}</p>
                                    </div>  
                                </> 
                            }
                        </>
                        }
                        <Link to={`/albums/${album_id}/notes`}> View previous notes </Link>
                        <NoteForm user_id={user.id} album_id={album_id} currContent={note ? note.content : ''}/>
                        {tracks === undefined ?
                            <Spinner animation="border" />
                            :
                            <>
                                {tracks === null ?
                                    <p>Could not retrieve tracks.</p>
                                    :
                                    <>
                                        <ul className="track-list">
                                            {tracks.map(track => <Track key={track.id} album={album} track={track}/>)}
                                        </ul>
                                    </>
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