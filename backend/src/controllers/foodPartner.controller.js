const foodPartnerModel= require('../models/foodPartner.model')
const foodModel= require('../models/food.model')

async function getFoodPartnerById(req,res){
    const foodPartnerId= req.params.id;

    const foodPartner= await foodPartnerModel.findById(foodPartnerId)

    if(!foodPartner){
        return res.status(404).json({
            message: "error while fetching food partner"
        })
    }

    const findFoodItems= await foodModel.find({foodPartner: foodPartnerId})

    return res.status(200).json({
        message: "food partner fetched successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: findFoodItems
        }
        
    })
}
module.exports= {getFoodPartnerById}