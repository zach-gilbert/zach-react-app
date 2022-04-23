import React from 'react';
import './CSS/App.css';
import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import PasswordGenerator from "./pages/PasswordGenerator.js";
import NoPage from "./pages/NoPage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="passwordgenerator" element={<PasswordGenerator />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
