import { useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faBookmarkOpen } from '@fortawesome/free-solid-svg-icons';


export default function Bookmark({ track_id }) {

    // this component renders a bookmark icon which when clicked, either adds or deletes a bookmark 
    // route: '/api/<int:user_id>/tracks/<int:track_id>/bookmark'

    // on click of bookmark button, send post request 

    const { user } = useUser();

    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        fetch (`/api/${user.id}/tracks/${track_id}/bookmark`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: user.id, track_id: track_id })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsBookmarked(!isBookmarked);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }







}