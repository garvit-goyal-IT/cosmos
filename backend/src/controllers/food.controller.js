const foodModel= require('../models/food.model')  
const storageService= require('../services/storage.service')
const { v4: uuid}= require('uuid')
const likeModel= require('../models/like.model')
const saveModel= require('../models/save.model')


async function createFood(req, res) {

    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    const result = await storageService.uploadFile(
        req.file.buffer,
        uuid()
    );
    const foodItem= await foodModel.create({
        name: req.body.name, 
        description: req.body.description,
        video: result.url,
        foodPartner: req.foodPartner._id
    })
    return res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })
}

async function getFoodItem(req,res){
    const foodItems= await foodModel.find({})

    if(!foodItems){
        return res.status(400).json({
            message: "error while fetching food items"
        })
    }

    return res.status(200).json({
        message: "food item fetched successfully",
        foodItems
    })
}

async function likeFood(req,res){
    const {foodId}= req.body

    const user= req.user
   
    const isAlreadyLiked= await likeModel.findOne({
        user: user._id,
        food: foodId
    })
    if(isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId    
        })
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: {likeCount: -1}
        })
        return res.status(200).json({
            message: "food unliked successfully"
        })
    }

    const like= await likeModel.create({
        user: user._id,
        food: foodId,
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: {likeCount: +1}
    })

    return res.status(201).json({
        message: "food liked successfully", 
        like
    })
}

async function saveFood(req,res){
    const {foodId}= req.body
    const user= req.user

    const isAlreadySaved= await saveModel.findOne({
        user: user._id,
        food: foodId
    })
    if(isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId    
        })
        return res.status(200).json({
            message: "food unsaved successfully"
        })
    }
    const save= await saveModel.create({
        user: user._id,
        food: foodId,
    })
    return res.status(201).json({
        message: "food saved successfully", 
        save
    })
}
module.exports={
    createFood,
    getFoodItem,
    likeFood,
    saveFood
}