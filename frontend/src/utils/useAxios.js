import {useContext} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import axiosInstance from "./axiosInstance";

const baseURL = 'http://127.0.0.1:8000'

const useAxios = () => {
    const { authTokens, setAuthTokens, setUser } = useContext(AuthContext)
    const axiosInstance = axios.create({
        baseURL,
        headers:{'Authorization': `Bearer ${authTokens?.access}`}
    })

    axiosInstance.interceptors.request.use( async req => {

        // check if token is expired
        const user = jwt_decode(authTokens.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs) < 1;
        if (!isExpired) return req
        // if token is expired, request new token
        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh:authTokens.refresh
        })

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req

    })

    return axiosInstance
}

export default useAxios