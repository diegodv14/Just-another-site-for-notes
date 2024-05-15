import axios from 'axios'

const AuthURL = import.meta.env.VITE_BACKEND_AUTHURL || "http://localhost:3001/api"


const GetRegister = async credentials => {
    const response = await axios.post(`${AuthURL}/register`, credentials)
    return response.data
}


const GetLogin = async credentials => {
    const response = await axios.post(`${AuthURL}/login`, credentials)
    return response.data
}

const GetLogout = async () => {
    const response = await axios.post(`${AuthURL}/logout`)
    return response.data
}

const AuthServices = {
    GetLogin,
    GetRegister,
    GetLogout
}

export default AuthServices