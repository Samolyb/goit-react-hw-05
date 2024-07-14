import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDNiZTg2NzM0ZTk1ZTFjYmY0Y2RhYzJkOTNkMmNkZCIsIm5iZiI6MTcyMDk3ODE0Mi4yNTU1NzgsInN1YiI6IjY2OTE4NGMwOWE4YWIwNGU4ODAyMzY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.luhEo_MNzE0_LlAy5a8Gjx17pyX75XxrHyH7AQ0yDAs`
                }
            });
            setReviews(response.data.results);
        };
        fetchReviews();
    }, [movieId]);

    return (
        <div>
            <h2>Reviews</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieReviews;