import { useParams } from "react-router-dom";
import SingleAlbum from "../components/SingleAlbum";

export default function AlbumPage() {

    const { user_id, album_id } = useParams();

    return (
        <>
            <SingleAlbum user_id={user_id} album_id={album_id} />
        </>
    );




}