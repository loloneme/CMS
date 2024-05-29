import React from 'react'
import { Switch, Route, Redirect, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import CinemaPage from '../pages/Cinemas'
import MoviePage from '../pages/Movies'
import RepertoirePage from '../pages/Repertoire'
import MovieRepertoirePage from '../pages/MovieRepertoire'

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cinemas" element={<CinemaPage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/repertoire" element={<RepertoirePage />} />
            <Route path="/repertoire/:id" element={<MovieRepertoirePage />} />

        </Routes>
    )
}

export default AppRouter
