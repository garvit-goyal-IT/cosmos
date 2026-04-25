const express= require('express')
const router= express.Router()
const foodController= require('../controllers/food.controller')
const authMiddleware= require('../middlewares/auth.middleware')
const multer= require('multer')

const upload= multer({
    storage: multer.memoryStorage()
})

router.post('/',
            authMiddleware.foodPartnerMiddleware,
            upload.single("video"),
            foodController.createFood
        )

router.get('/',
            authMiddleware.userModelMiddleware,
            foodController.getFoodItem
)

router.post('/like',
            authMiddleware.userModelMiddleware,
            foodController.likeFood
)

router.post('/save',
            authMiddleware.userModelMiddleware,
            foodController.saveFood
)
module.exports= router