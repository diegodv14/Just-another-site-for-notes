import { Note } from "../models/Note.js"
import 'dotenv/config'
import jwt from 'jsonwebtoken'


export const GetNotes = async (req, res) => {
    try {
        const user = jwt.verify(req.token, process.env.SECRET)
        const notes = await Note.find({ user: user.id })
        res.status(200).json(notes)
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

export const GetSpecificNote = async (req, res) => {
    try {
        const note = await Note.findById(req.token)

        if (!note) res.status(404).json({ error: "Note not found" })

        res.status(200).json(note)
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

export const PostNote = async (req, res) => {
    try {
        const user = jwt.verify(req.cookies.token, process.env.SECRET)
        const NewNote = new Note({
            content: req.body.content,
            importance: req.body.importance,
            user: user.id
        })

        const savedNote = await NewNote.save()

        res.status(201).json(savedNote)
    }
    catch (err) {
        res.status(400).json({ error: err })

    }
}

export const DeleteNote = async (req, res) => {
    try {
        const isDeleted = await Note.findByIdAndDelete(req.params.id)
        if (!isDeleted) return res.status(404).json({ err: "The note doesn't exist" })
        return res.status(200)
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

export const UpdateNote = async (req, res) => {
    try {
        const EditedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!EditedNote) res.status(400).json({ err: "The note wasn't update or no exists" })
        res.status(200).json(EditedNote)
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}
