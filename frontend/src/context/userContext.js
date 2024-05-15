import { create } from 'zustand'

export const useUserContext = create((set) => ({
    user: {
        username: null,
        id: null
    },
    setUser: (data) => set(({ user: data }))
}))