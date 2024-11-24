import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {MainNavbar} from "./components/Navbars";
import Routing from "./components/Routing";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"

const App = ()=> (
    <div className="App">
        <Router>
            <AuthProvider>
                <MainNavbar/>
                <Routing/>
            </AuthProvider>
        </Router>
    </div>
)

export default App;
