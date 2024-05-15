import { GetNotes, GetSpecificNote, PostNote, DeleteNote, UpdateNote } from "../controllers/NotesController.js";
import { AuthRequired } from "../middlewares/AuthRequired.js";
import { Router } from 'express'


export const NoteRouter = Router()


NoteRouter.get('/', AuthRequired, GetNotes)


NoteRouter.get('/:id', AuthRequired, GetSpecificNote)


NoteRouter.post('/', AuthRequired, PostNote)


NoteRouter.delete('/:id', AuthRequired, DeleteNote)


NoteRouter.put('/:id', AuthRequired, UpdateNote)

