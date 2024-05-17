import { Note } from "../models/Note.js"
import { User } from "../models/Users.js"
import 'dotenv/config'
import mongoose from "mongoose"


export const GetNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.data.id })
        res.status(200).json(notes)
    }
    catch (err) {
        res.status(400).json({ error: err })
    }
}

// export const GetSpecificNote = async (req, res) => {
//     try {
//         const note = await Note.findById(req.token)

//         if (!note) res.status(404).json({ error: "Note not found" })

//         res.status(200).json(note)
//     }
//     catch (err) {
//         res.status(400).json({ error: err })
//     }
// }

export const PostNote = async (req, res) => {
    try {

        const user = await User.findById(req.data.id)

        const CreatedNote = {
            content: req.body.content,
            important: req.body.important,
            color: req.body.color,
            user: user.id
        }
        const NewNote = new Note(CreatedNote)

        const savedNote = await NewNote.save()

        user.notes.push(savedNote._id);
        await user.save();

        res.status(201).json(savedNote)
    }
    catch (err) {
        res.status(400).json({ error: err })

    }
}

export const DeleteNote = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const isDeleted = await Note.findByIdAndDelete(id)
        if (!isDeleted) return res.status(404).json({ err: "The note doesn't exist" })
        return res.status(200).json(isDeleted)
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


export const GetProfile = async (req, res) => {
    try {
        const { ObjectId } = mongoose.Types;

        if (!ObjectId.isValid(req.data.id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const Profile = await User.find({ _id: req.data.id }).populate('notes')
        if (!Profile) res.json({ error: "The profile doesn't exist" })
        res.status(200).json(Profile)
    }
    catch (err) {
        res.json({ error: err })
    }
}
