const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Note = require('../models/Note.js')
const assert = require('node:assert')
const app = require('../app.js')
const { NoExistingNote, notesInDb } = require('./testHelper.js')


const api = supertest(app)

const InitialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    },
]

beforeEach(async () => {
    await Note.deleteMany({})
    const noteObject = InitialNotes.map(note => new Note(note))
    const PromiseArray = noteObject.map(note => note.save())
    await Promise.all(PromiseArray)

})

describe("All the notes test", () => {
    describe("Get the notes", () => {

        test("Get two notes", async () => {
            const response = await api.get("/api/notes")
            assert.strictEqual(response.body.length, InitialNotes.length)
        })

        test("Get a note HTML easy", async () => {
            const result = await api.get('/api/notes')
            const notes = result.body.map(note => note.content)
            assert.strictEqual(notes.includes("HTML is easy"), true)
        })
        test("a specific note can be viewed", async () => {
            const notesStart = await notesInDb()
            const note = notesStart[0]

            const result = await api.get(`/api/notes/${(note._id)}`).expect(200).expect('Content-Type', /application\/json/)

            assert(result.body, note)

        })

    })

    describe("Send a note", () => {
        test('a valid note can be added ', async () => {
            const newNote = {
                content: 'async/await simplifies making async calls',
                important: true,
            }

            await api
                .post('/api/notes')
                .send(newNote)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const notesAtEnd = await notesInDb()

            assert.strictEqual(notesAtEnd.length, InitialNotes.length + 1)

            const contents = notesAtEnd.map(n => n.content)

            assert(contents.includes('async/await simplifies making async calls'))
        })

        test('Note without content', async () => {
            const newNote = {
                important: true
            }

            await api
                .post('/api/notes')
                .send(newNote)
                .expect(400)

            const response = await notesInDb()

            assert.strictEqual(response.length, InitialNotes.length + 1)
        })
    })

    describe("Other funcionalities", () => {
        test('a note can be deleted', async () => {
            const notesStart = await notesInDb()
            const note = notesStart[2]
            await api.delete(`/api/notes/${note._id}`).expect(204)


            const notesAtEnd = await notesInDb()
            const contents = notesAtEnd.map(note => note.content)
            assert(!contents.includes(note.content))

            assert.strictEqual(notesAtEnd.length, InitialNotes.length)

        })
    })
})

after(async () => {
    await mongoose.connection.close()
})