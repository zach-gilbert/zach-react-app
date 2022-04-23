import React from 'react';
import './CSS/App.css';
import Home from "./Components/Home.js";
import About from "./Components/About.js";
import PasswordGenerator from "./Components/PasswordGenerator.js";
import NoPage from "./Components/NoPage.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => (
    <BrowserRouter>
        <Navigation />
        <RouteContent />
    </BrowserRouter>
);

const Navigation = () => (
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/about">About</Link>
        </li>
        <li>
            <Link to="/passwordgenerator">Password Generator</Link>
        </li>
    </ul>
);

const RouteContent = () => (
    <Routes>
        <Route exact path ="/" element={<Home />} />
        <Route path ="/about" element={<About />} />
        <Route path ="/passwordgenerator" element={<PasswordGenerator />} />
        <Route path ="*" element={<NoPage />} />
    </Routes>
);

export default App;
