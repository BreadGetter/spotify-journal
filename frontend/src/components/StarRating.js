import { useState } from 'react';
import { useUser } from '../contexts/UserProvider';
import Rating from '@mui/material/Rating';

export default function StarRating({ isAlbum, album_id, track_id, defaultValue }) {

    const { user } = useUser();
    const [rating, setRating] = useState(defaultValue);
    
    const handleRatingChange = (event, newValue) => {
        setRating(newValue);

        const route = isAlbum ? `/api/albums/${user.id}/${album_id}/rating` : `/api/albums/${user.id}/${track_id}/rating`;

        fetch (route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_album: isAlbum, user_id: user.id, rating: newValue })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }






    
    return (
        <div>
            <Rating 
            name="half-rating" 
            defaultValue={defaultValue} 
            precision={0.5} 
            onChange={handleRatingChange}
            />
        </div>
    );
}
