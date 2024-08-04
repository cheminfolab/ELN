import React from "react";
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import {SubPage} from "../pages/ChemPage";
import ProjectPage from "../pages/ProjectPage";
import {ChemProvider} from "../context/ChemContext";
import '../pages/AuthPage.css'

const RoutesComp: React.FC = () => {
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
                                <SubPage/>
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

export default RoutesComp;