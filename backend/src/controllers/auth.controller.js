const userModel= require('../models/user.model')
const foodPartnerModel= require('../models/foodPartner.model')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){

    const {fullName ,email, password}= req.body 

    if(!fullName || !email || !password){
        return res.status(401).json({
            message: "give all required fields"
        })
    }

    const isUserAlreadyExist= await userModel.findOne({
        email
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message: "user already exists"
        })
    }
    
    const hashedPassword= await bcrypt.hash(password , 10)

    const user = await userModel.create({
        fullName, email, password: hashedPassword
    })

    const token= jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
    )

    res.cookie("token",token)

    return res.status(201).json({
        message: "user registered successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }   
    })

}

async function loginUser(req,res){
    const {email, password}= req.body

    if(!email || !password){
        return res.status(400).json({
            message: "enter all required details"
        })
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const isPasswordValid= await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "invalid email or password"
        }
        )
    }

    const token= jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.cookie("token",token)

    return res.status(200).json({
        messsage: "user loggedin successfully",
        user:{
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}

async function logoutUser(res,res){
    res.clearCookie("token");

    res.status(200).json({
        message: "user loggedout successfully"
    })
}

async function registerFoodPartner(req,res){
    const {email, name, password}= req.body

    if(!email || !password || !name){
        return res.status(400).json({
            message: "all fields are required"
        })
    }
    const isFoodPartnerAlreadyExists= await foodPartnerModel.findOne({email})
    if(isFoodPartnerAlreadyExists){
        return res.status(400).json({
            message : "food partner with this email already exists"
        }
        )
    }

    const hashedPassword= await bcrypt.hash(password, 10)

    const foodPartner= await foodPartnerModel.create({
        email , name, password:hashedPassword
    })

    const token= jwt.sign({id: foodPartner._id}, process.env.JWT_SECRET)

    res.cookie("token",token)

    return res.status(200).json({
        message: "food partner successfully registered",
        foodPartner: { 
        _id: foodPartner._id,
        email: foodPartner.email,
        name: foodPartner.name
        }
    })



}

async function loginFoodPartner(req,res){
    const {email, password}= req.body

    if(!email || !password){
        return res.status(400).json({
            message: "enter both email and password"
        })
    }

    const foodpartner= await foodPartnerModel.findOne({email})

    if(!foodpartner){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid= await bcrypt.compare(password, foodpartner.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign({id: foodpartner._id},process.env.JWT_SECRET)

    res.cookie("token",token)

    return res.status(200).json({
        message: "food partner loggedin successfully",
        foodPartner: {
            email : foodpartner.email,
            _id: foodpartner._id,
            name: foodpartner.name
        }
    })

}

async function logoutFoodPartner(req,res){
    res.clearCookie("token")
    return res.status(200).json({
        message: "food partner logout successfully"
    })
}

module.exports= {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}