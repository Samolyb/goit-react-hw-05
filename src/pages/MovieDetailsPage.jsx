import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useParams, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getImageUrl } from '../movie-api';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from || "/movies");

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await axios.get(`/movie/${movieId}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDNiZTg2NzM0ZTk1ZTFjYmY0Y2RhYzJkOTNkMmNkZCIsIm5iZiI6MTcyMDk3ODE0Mi4yNTU1NzgsInN1YiI6IjY2OTE4NGMwOWE4YWIwNGU4ODAyMzY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.luhEo_MNzE0_LlAy5a8Gjx17pyX75XxrHyH7AQ0yDAs`
                }
            });
            setMovie(response.data);
        };
        fetchMovieDetails();
    }, [movieId]);

    const goBack = () => {
        navigate(backLinkRef.current);
    };

    return (
        <div>
            {movie && (
                <>
                    <button onClick={goBack}>Go back</button>
                    <h1>{movie.title}</h1>
                    <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                    <p>{movie.overview}</p>
                    <ul>
                        <li>
                            <Link to="cast">Cast</Link>
                        </li>
                        <li>
                            <Link to="reviews">Reviews</Link>
                        </li>
                    </ul>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </>
            )}
        </div>
    );
}
