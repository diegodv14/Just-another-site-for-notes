import { create } from 'zustand'


export const useNoteContext = create((set) => ({
    notes: [],
    setNotes: (newNotes) => set({ notes: newNotes }),
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] }))
}));