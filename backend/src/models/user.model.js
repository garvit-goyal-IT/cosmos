const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "full name is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    password:{
        type: String
    }
},
{
    timestamps: true
})

const userModel= mongoose.model('user', userSchema)

module.exports= userModel 