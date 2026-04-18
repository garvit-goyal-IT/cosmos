const mongoose= require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("database is connected successfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports= connectToDB