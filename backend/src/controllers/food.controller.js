const foodModel= require('../models/food.model')  
const storageService= require('../services/storage.service')
const { v4: uuid}= require('uuid')


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
module.exports={
    createFood
}