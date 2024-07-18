import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const fetchMovies = async () => {
            const query = searchParams.get('query') || '';
            if (query) {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDNiZTg2NzM0ZTk1ZTFjYmY0Y2RhYzJkOTNkMmNkZCIsIm5iZiI6MTcyMDk3ODE0Mi4yNTU1NzgsInN1YiI6IjY2OTE4NGMwOWE4YWIwNGU4ODAyMzY5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.luhEo_MNzE0_LlAy5a8Gjx17pyX75XxrHyH7AQ0yDAs`
                    }
                });
                setMovies(response.data.results);
            }
        };
        fetchMovies();
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ query });
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies"
                />
                <button type="submit">Search</button>
            </form>
            <MovieList movies={movies} />
        </div>
    );
}