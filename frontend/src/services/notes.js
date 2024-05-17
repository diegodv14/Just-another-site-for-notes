import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_NOTEURL || 'http://localhost:3001/api/notes'

const getAll = (token) => {
    const request = axios.get(baseUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return request.then(response => response.data)
}

const create = (newObject, token) => {
    const request = axios.post(baseUrl, newObject, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return request.then(response => response.data)
}
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteNote = async (id, token) => {
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const getProfile = async (token) => {
    const request = await axios.get(`${baseUrl}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return request.data
}

const noteServices = {
    getAll,
    create,
    update,
    deleteNote,
    getProfile
}

export default noteServices