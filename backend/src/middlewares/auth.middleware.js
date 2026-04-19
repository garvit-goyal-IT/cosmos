const foodPartnerModel= require('../models/foodPartner.model')
const jwt= require('jsonwebtoken')
const userModel= require('../models/user.model')

async function foodPartnerMiddleware(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET) 

       const foodPartner= await foodPartnerModel.findById(decoded.id)

       req.foodPartner= foodPartner

       next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

async function userModelMiddleware(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message: "please login first"
        })
    }

    try{

        const decoded= jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id)

        req.user= user

        next()
    }catch(err){
        return res.status(400).json({
            message: "Invalid token"
        })
    }
}
module.exports= {
    foodPartnerMiddleware
    ,userModelMiddleware
}