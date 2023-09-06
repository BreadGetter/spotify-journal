import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserProvider';
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';



export default function Bookmark({ track_id, is_bookmarked }) {

    const { user } = useUser();
    const [isBookmarked, setIsBookmarked] = useState(is_bookmarked);


    const toggleBookmark = () => {
        fetch (`/api/${user.id}/${track_id}/bookmark`, {
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

    // if is bookmarked, render button thats a filled out bookmark icon
    // if not bookmarked, render button thats an empty bookmark icon


    return (
        <div>

                <FontAwesomeIcon icon={isBookmarked ? solidBookmark : regularBookmark} onClick={toggleBookmark} />

            
        </div>   
    );

}