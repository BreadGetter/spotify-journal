import { Link } from 'react-router-dom';


export default function Album({ album }) {

    console.log(album)

    return (
        <li key={album.id} className='album-item'>
            <h4>{album.title}</h4>
            <Link to={`/${album.user_id}/albums/${album.id}`}>
                <img src={album.cover_url} width={100} height={100}/>
            </Link>
            <p>{album.artist}</p>
            <p>{album.release_date}</p>
        </li>
    );

}
