import React from 'react'
import { Switch, Route, Redirect, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import CinemaPage from '../pages/Cinemas'
import MoviePage from '../pages/Movies'
import RepertoirePage from '../pages/Repertoire'
import MovieRepertoirePage from '../pages/MovieRepertoire'
import { Navigate } from 'react-router-dom';
import ForbiddenPage from '../pages/Forbidden'
import UsersPage from '../pages/UsersPage'
import { useUser } from '../utils/UserContext'

const AppRouter = () => {
    const {user} = useUser();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cinemas" element={<CinemaPage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route exact path="/repertoire" element={<RepertoirePage />} />
            <Route exact path="/repertoire/:id" element={<MovieRepertoirePage />} />
            <Route path="*" element={<Navigate to={user ? (user.role === "ADMIN" ? "/users" : "/cinemas") : "/login"} />} />
            <Route exact path="/users" element={<UsersPage />} />
            <Route path="/forbidden" element={ForbiddenPage} />


        </Routes>
    )
}

export default AppRouter
