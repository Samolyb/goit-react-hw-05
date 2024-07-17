import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../movie-api';
import MovieList from '../components/MovieList/MovieList';

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getTrendingMovies();
            setMovies(movies);
        };
        fetchMovies();
    }, []);

    return <MovieList movies={movies} />;
}
