const Note = require('../models/Note.js')
const User = require('../models/Users.js')

const NoExistingNote = async () => {
    const note = new Note({ content: 'willremovethissoon' })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}


const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON())
}



module.exports = { NoExistingNote, notesInDb, usersInDb }