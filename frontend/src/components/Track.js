

export default function Track({ album, track }) {

    console.log(album.cover_url);

    return (
        <div className="Track">
            <div className="Track-information">
                <img src={album.cover_url} alt={album.title} width={75} height={75}/>
                <h3>{track.title}</h3>
                <p> {album.title}</p>
                <p> {track.duration}</p>
            </div>
        </div>
    );

}