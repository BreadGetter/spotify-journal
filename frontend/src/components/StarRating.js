import Rating from '@mui/material/Rating';

export default function StarRating({ track_id }) {
    
        return (
            <div>
                <Rating name="half-rating" defaultValue={0} precision={0.5} />
            </div>
        );
}
