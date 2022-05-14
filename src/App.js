import * as React from 'react';
import './CSS/App.css';
import AppBarNavigation from "./components/AppBarNavigation.js";
import {BrowserRouter} from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <AppBarNavigation />
            </BrowserRouter>
        );
    }
}

export default App;
