import StarRating from "./StarRating";
import Bookmark from "./Bookmark";
import NoteForm from "./NoteForm";
import { Link } from "react-router-dom";


export default function Track({ album, track }) {

    console.log(album.cover_url);

    return (
        <div className="Track">
            <div className="Track-information">
                <img src={album.cover_url} alt={album.title} width={75} height={75}/>
                <h3>{track.title}</h3>
                <p> {album.title}</p>
                <p> {track.duration}</p>
                <StarRating track_id={track.id} />
                <Bookmark track_id={track.id} />
                <NoteForm user_id={album.user_id} album_id={album.id} track_id={track.id} />
                <Link to={`/albums/${album.id}/tracks/${track.id}/notes`}> View previous track notes </Link>
            </div>
        </div>
    );

}