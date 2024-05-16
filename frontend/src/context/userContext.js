import { create } from 'zustand'

const SavedUser = JSON.parse(window.localStorage.getItem('user')) || undefined

export const useUserContext = create((set) => ({
    user: SavedUser || {
        username: null,
        id: null,
        token: null
    },
    setUser: (data) => set(({ user: data }))
}))