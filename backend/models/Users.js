import mongoose from "mongoose"

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    notes: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Note'
        }
    ]
})

export const User = mongoose.model("User", UsersSchema)


