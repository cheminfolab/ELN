import {createContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import useAxios from "../utils/useAxios";


const AuthContext = createContext({})
export default AuthContext


export const AuthProvider = ({children}) => {

    // todo: rewrite !
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    let api = useAxios()

    let loginUser = async (e) => {
        e.preventDefault()
        await api.post('/token/', {
            'email':e.target.email.value,
            'password':e.target.password.value
            })
            .then( (response) => {
                if (response.status === 200) {
                    const data = response.data
                    setAuthTokens(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens', JSON.stringify(data))
                    navigate(-2) // redirects to element from PrivateRoute
                } else {
                    alert('Something went wrong.')
                }
            })
            .catch( (error) => console.log(error))
    }

    let registerUser = async (event) => {
        event.preventDefault()
        await api.post('/user/register/', {
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                email: event.target.email.value,
                password:event.target.password.value,
                working_group: event.target.working_group.value
            })
            .then( (response) => {
                if (response.status === 200) {
                    loginUser(event)
                    // todo: notification / redirection to user page (prompt user for additional info: phone etc.)
                } else {
                    alert('Something went wrong!')
                }
            })
            .catch( (error) => console.log(error))
    }

    let logoutUser = () => {
        setUser(null)
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let updateToken = async () => {
        const tokens = JSON.stringify({'refresh':authTokens?.refresh})
        await api.post('/token/refresh/', {tokens})
            .then( (response) => {
                const data = response.data
                if (response.status === 200){
                    setAuthTokens(data)
                    setUser(jwt_decode(data.access))
                    localStorage.setItem('authTokens', JSON.stringify(data))
                } else {
                    logoutUser()
                }
                if (loading){
                    setLoading(false)
                }
            })
            .catch( (error) => console.log(error))
        // let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({'refresh':authTokens?.refresh})
        // })
        // let data = await response.json()
        // if (response.status === 200){
        //     setAuthTokens(data)
        //     setUser(jwt_decode(data.access))
        //     localStorage.setItem('authTokens', JSON.stringify(data))
        // } else {
        //     logoutUser()
        // }
        // if (loading){
        //     setLoading(false)
        // }
    }

    useEffect(() => {
        if (loading){
            updateToken()
        }
        let interval = setInterval(() => {
            if (authTokens){
                updateToken()
            }
        }, 270000) // 4.5 minutes
        return () => clearInterval(interval)
    }, [authTokens, loading])

    let contextData = {
        user:user,
        setUser:setUser,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}