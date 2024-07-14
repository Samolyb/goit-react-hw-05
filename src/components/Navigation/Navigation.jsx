import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <nav>
        <NavLink to="/" exact>
            Home
        </NavLink>
        <NavLink to="/movies">
            Movies
        </NavLink>
    </nav>
);

export default Navigation;