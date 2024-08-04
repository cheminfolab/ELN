import {Navigate} from 'react-router-dom'
import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
import {AuthContextType} from "../@types/authorization";

const PrivateRoute:React.FC<any> = ({ children }) => {
    const {user} = useContext(AuthContext) as AuthContextType
    return user ? children : <Navigate to="/login" />
}

export default PrivateRoute