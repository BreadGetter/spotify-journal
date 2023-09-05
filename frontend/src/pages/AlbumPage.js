import { useParams } from "react-router-dom";
import SingleAlbum from "../components/SingleAlbum";

export default function AlbumPage() {

    const { album_id } = useParams();

    return (
        <>
            <SingleAlbum album_id={album_id} />
        </>
    );




}