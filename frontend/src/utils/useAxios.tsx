import {useContext} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import * as dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import {AuthContextType, User} from "../@types/authorization";

const useAxios = (authentication=false) => {
    const {
        authTokens,
        setAuthTokens,
        setUser,
        logoutUser
    } = useContext(AuthContext) as AuthContextType

    const axiosInstance = axios
        .create({
            baseURL: '/api/',
            timeout: 5000, // ms
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            }
        })

    if (authentication) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${authTokens?.access}`
        axiosInstance.interceptors.request.use(async request => {
            // check if token is expired
            const user: User = jwt_decode(authTokens.access)
            const isExpired = dayjs.unix(user.exp).diff(dayjs(), 'second') < 30;
            if (!isExpired) return request

            // if token is expired, request new token
            const response = await axios.post(`/api/token/refresh/`, {
                refresh: authTokens.refresh
            })
            const tokens = response.data

            localStorage.setItem('authTokens', JSON.stringify(tokens))
            setAuthTokens(tokens)
            setUser(jwt_decode(tokens.access))

            request.headers.Authorization = `Bearer ${tokens.access}`
            return request
        })
    }
    const getAll = (url: string) => axiosInstance
        .get(url)
        .then(response => {
            if (response.statusText === 'Unauthorized') logoutUser()
            return response.data
        })

    const get = (url: string, id: string) => axiosInstance
        .get(`${url}/${id}`)
        .then(response => {
            if (response.statusText === 'Unauthorized') logoutUser()
            return response.data
        })

    const create = (url: string, newObject: {}) => axiosInstance
        .post(url, newObject)
        .then(response => {
            if (response.statusText === 'Unauthorized') logoutUser()
            return response.data
        })

    const update = (url: string, id: string, newObject: {}) => axiosInstance
        .put(`${url}/${id}`, newObject)
        .then(response => {
            if (response.statusText === 'Unauthorized') logoutUser()
            return response.data
        })

    const remove = (url: string, id: string) => axiosInstance
        .delete(`${url}/${id}`)
        .then(response => {
            if (response.statusText === 'Unauthorized') logoutUser()
            console.log('delete response', response)
        })


    return {axiosInstance, getAll, get, create, update, remove}
}

export default useAxios