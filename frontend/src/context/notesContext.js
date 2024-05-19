import { create } from 'zustand'


export const useNoteContext = create((set) => ({
    notes: [],
    filter: null,
    setFilter: (value) => set({ filter: value }),
    setNotes: (newNotes) => set({ notes: newNotes }),
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] }))
}));