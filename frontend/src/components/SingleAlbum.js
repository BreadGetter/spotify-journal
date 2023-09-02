
import { useState, useEffect } from "react";
import Album from "./Album";
import Spinner from 'react-bootstrap/Spinner';
import Track from "./Track";
import NoteForm from "./NoteForm";



export default function SingleAlbum({ user_id, album_id }) {
    const [album, setAlbum] = useState();
    const [tracks, setTracks] = useState();
    const [note, setNote] = useState();

    useEffect(() => {
    (async () => {
        const response = await fetch(`/api/albums/${user_id}/${album_id}`);
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
        })();
      }, [album, tracks, note]);

      
    
      return (
        <>
            {album === undefined ? 
                <Spinner animation="border" />
                :
                <>
                    <h1>{album.title} - {album.artist}</h1>
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
                    <NoteForm user_id={user_id} album_id={album_id} currContent={note ? note.content : ''}/>
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
    );
}