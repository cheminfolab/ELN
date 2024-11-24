import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import {SubstancePage} from "../pages/ChemPage";
import ProjectPage from "../pages/ProjectPage";
import {ChemProvider} from "../context/ChemContext";
import AuthContext from "../context/AuthContext";
import {AuthContextType} from "../@types/authorization";
import '../pages/AuthPage.css'

const PrivateRoute: React.FC<any> = ({children}) => {
    const {user} = useContext(AuthContext) as AuthContextType
    return user ? children : <Navigate to="/login"/>
}
const Routing: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route
                    path="/"
                    element={<PrivateRoute><HomePage/></PrivateRoute>}
                />
                <Route
                    path="/login"
                    element={<AuthPage/>}
                />
                {/*<Route*/}
                {/*    path="/chemicals"*/}
                {/*    element={<PrivateRoute><ComPage/></PrivateRoute>}*/}
                {/*/>*/}
                <Route
                    path="/substances"
                    element={
                        <PrivateRoute>
                            <ChemProvider>
                                <SubstancePage/>
                            </ChemProvider>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/projects"
                    element={<PrivateRoute><ProjectPage/></PrivateRoute>}
                />
            </Routes>
        </div>
    );
}

export default Routing;