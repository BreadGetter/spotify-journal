
import { useState, useEffect } from "react";
import Album from "./Album";
import Spinner from 'react-bootstrap/Spinner';
import Track from "./Track";


export default function SingleAlbum({ user_id, album_id }) {
    const [album, setAlbum] = useState();
    const [tracks, setTracks] = useState();

    // print the json response to the console

    console.log("user id")
    console.log(user_id);
    console.log("album id");
    console.log(album_id);

    useEffect(() => {
    (async () => {
        const response = await fetch(`/api/albums/${user_id}/${album_id}`);
        if (response.ok) {
            const results = await response.json();
            setAlbum(results);
            setTracks(results.tracks);
          }
          else {
            setTracks(null);
          }
        })();
      }, []);

    console.log("album data");
    console.log(album);
    console.log("tracks data");
    console.log(tracks);

    
      return (
        <>
            {album === undefined ? 
                <Spinner animation="border" />
                :
                <>

                    <h1>{album.title}</h1>
                    <img src={album.cover_url} width={200} height={200}/>
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