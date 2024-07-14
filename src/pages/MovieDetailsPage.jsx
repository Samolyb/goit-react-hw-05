import React, { useState, useEffect } from 'react';
import { useParams, Link, Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../components/MovieCast';
import MovieReviews from '../components/MovieReviews';
import { getImageUrl } from '../api/movie-api';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const { url, path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDNiZTg2NzM0ZTk1ZTFjYmY0Y2RhYzJkOTNkMmNkZCIsIm5iZiI6MTcyMDk3ODE0Mi4yNTU1NzgsInN1YiI6IjY2OTE4NGMwOWE4YWIwNGU4ODAyMzY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.luhEo_MNzE0_LlAy5a8Gjx17pyX75XxrHyH7AQ0yDAs`
                }
            });
            setMovie(response.data);
        };
        fetchMovieDetails();
    }, [movieId]);

    const goBack = () => {
        if (location.state && location.state.from) {
            history.push(location.state.from);
        } else {
            history.push('/movies');
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
                            <Link to={`${url}/cast`}>Cast</Link>
                        </li>
                        <li>
                            <Link to={`${url}/reviews`}>Reviews</Link>
                        </li>
                    </ul>
                    <Route path={`${path}/cast`} component={MovieCast} />
                    <Route path={`${path}/reviews`} component={MovieReviews} />
                </>
            )}
        </div>
    );
};

export default MovieDetailsPage;
