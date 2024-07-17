import React, { useState, useEffect } from 'react';
import { useParams, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../components/MovieCast/MovieCast';
import MovieReviews from '../components/MovieReviews/MovieReviews';
import { getImageUrl } from '../movie-api';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await axios.get(`/movie/${movieId}`);
            setMovie(response.data);
        };
        fetchMovieDetails();
    }, [movieId]);

    const goBack = () => {
        if (location.state && location.state.from) {
            navigate(location.state.from);
        } else {
            navigate('/movies');
        }
    };

    return (
        <div>
            {movie && (
                <>
                    <button onClick={goBack}>Go back</button>
                    <h1>{movie.title}</h1>
                    <img
                        src={getImageUrl(movie.poster_path)}
                        alt={movie.title}
                    />
                    <p>{movie.overview}</p>
                    <ul>
                        <li>
                            <Link to="cast">Cast</Link>
                        </li>
                        <li>
                            <Link to="reviews">Reviews</Link>
                        </li>
                    </ul>
                    <Routes>
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Routes>
                </>
            )}
        </div>
    );
}
