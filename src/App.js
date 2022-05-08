import * as React from 'react';
import './CSS/App.css';
import Home from "./components/Home.js";
import About from "./components/About.js";
import Password from "./components/Password.js";
import NoPage from "./components/NoPage.js";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

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
        <Route path ="/passwordgenerator" element={<Password />} />
        <Route path ="*" element={<NoPage />} />
    </Routes>
);

export default App;
