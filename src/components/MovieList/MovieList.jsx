import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../movie-api';

export default function MovieList({ movies }) {
    const location = useLocation();
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie.id}>
                    <Link
                        to={`/movies/${movie.id}`}
                        state={{ from: location }}
                    >
                        <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
