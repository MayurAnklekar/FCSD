import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../components/Home';
import Login from '../components/Login';
import Update from '../components/Update';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Home/>} />
            <Route path="/update/:id" element={<Update/>} />
            <Route path="/addFruit" element={<Update/>} />
        </Routes>
    )
}

export default Router