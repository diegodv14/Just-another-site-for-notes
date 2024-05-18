import mongoose from "mongoose"
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        required: true
    },
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const Note = mongoose.model('Note', noteSchema)

