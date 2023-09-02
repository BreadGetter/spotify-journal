import NoteForm from "./NoteForm";

export default function Track({ album, track }) {

    console.log(album.cover_url);

    return (
        <div className="Track">
            <div className="Track-information">
                <img src={album.cover_url} alt={album.title} width={75} height={75}/>
                <h3>{track.title}</h3>
                <p> {album.title}</p>
                <p> {track.duration}</p>
                <NoteForm user_id={album.user_id} album_id={album.id} track_id={track.id} currContent={track.note ? track.note.content : ''}/>
            </div>
        </div>
    );

}