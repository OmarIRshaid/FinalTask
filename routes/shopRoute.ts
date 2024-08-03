import { NextFunction, Router , Request , Response} from "express";
import {AppError} from "../errors/AppError.js"
import {Hotline} from '../db/entities/Hotline.js'
import { createShop, getAllShops, getSingleshop } from "../controller/shopController.js";
const router = Router()

router.post('/' , async(req: Request , res: Response , next:NextFunction)=>{
    try {
        if(!req.body.shopName || !req.body.email || !req.body.password || !req.body.hotlineId){
            throw new AppError("some fields are missing" , 400 , true)
        }
    
        const shop = await createShop(req.body , req.body.hotlineId)
        res.status(201).json({
            msg: "shop created successfully",
            shop: shop
        })
    } catch (error) {
        next(error)
    }
    
    
})

router.get('/' , getAllShops)

router.get('/:id' , async(req:Request , res: Response , next: NextFunction)=>{
    try {
        const shopId = req.params.id
        const shop = await getSingleshop(shopId)
        res.status(200).json({
            msg: "shop found successfully" ,
            shop : shop
        })
    } catch (error) {
        next(error)
    }
    
})

export default router