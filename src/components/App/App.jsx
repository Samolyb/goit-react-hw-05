import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import './App.module.css';
import Navigation from '../Navigation/Navigation';

const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

export default function App() {
    return (
        <div className="App">
            <Navigation />
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <Route path="/" exact component={<HomePage />} />
                    <Route path="/movies" exact component={<MoviesPage />} />
                    <Route path="/movies/:movieId" component={<MovieDetailsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Router>
            </Suspense>
        </div>
    );
}
