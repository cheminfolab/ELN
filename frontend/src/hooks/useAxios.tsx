import {useContext} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AuthContext from "../contexts/AuthContext";
import {AuthContextType, User} from "../@types/authorization";

const baseURL = process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL : '/api/'

const useAxios = (authentication=false) => {
    const {
        authTokens,
        setAuthTokens,
        setUser,
        logoutUser
    } = useContext(AuthContext) as AuthContextType

    const axiosInstance = axios
        .create({
            baseURL: baseURL,
            timeout: 5000, // ms
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json'
            }
        })

    if (authentication) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${authTokens?.access}`
        axiosInstance.interceptors.request.use(request => {

            // check if token is expired
            const user: User = jwt_decode(authTokens.access)
            const isExpired = dayjs.unix(user.exp).diff(dayjs(), 'second') < 30;
            if (!isExpired) return request

            // if token is expired, request new token
            axios
                .post(`${baseURL}/token/refresh/`, {refresh: authTokens.refresh})
                .then(response => {
                    console.log('token refresh response:', response)
                    const tokens = response.data
                    setAuthTokens(tokens)
                    localStorage.setItem('authTokens', JSON.stringify(tokens))
                    setUser(jwt_decode(tokens.access))
                    request.headers.Authorization = `Bearer ${tokens.access}`
                })
                .catch(error => console.log(error.response.statusText)) // todo: change
            return request
        })
    }

    const getAll = (url: string) => axiosInstance
        .get(url)
        .then(response => response.data)
        .catch(error => {
            // todo: change to status?
            if (error.response.statusText === 'Unauthorized') logoutUser()
        })

    const get = (url: string, id: string | number) => axiosInstance
        .get(`${url}/${id}`)
        .then(response => response.data)
        .catch(error => {
            if (error.response.statusText === 'Unauthorized') logoutUser()
        })

    const create = (url: string, newObject: {}) => axiosInstance
        .post(url, newObject)
        .then(response => response.data)
        .catch(error => {
            if (error.response.statusText === 'Unauthorized') logoutUser()
        })

    const update = (url: string, id: string | number, newObject: {}) => axiosInstance
        .put(`${url}/${id}`, newObject)
        .then(response => response.data)
        .catch(error => {
            if (error.response.statusText === 'Unauthorized') logoutUser()
        })

    const remove = (url: string, id: string | number) => axiosInstance
        .delete(`${url}/${id}`)
        .then(response => console.log('delete response', response))
        .catch(error => {
            if (error.response.statusText === 'Unauthorized') logoutUser()
        })

    return {axiosInstance, getAll, get, create, update, remove}
}

export default useAxios