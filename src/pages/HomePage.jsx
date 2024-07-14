import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../api/movie-api';
import MovieList from '../components/MovieList';

const HomePage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getTrendingMovies();
            setMovies(movies);
        };
        fetchMovies();
    }, []);

    return <MovieList movies={movies} />;
};

export default HomePage;