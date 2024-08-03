import { NextFunction, Router , Request , Response } from "express";
import {AppError} from '../errors/AppError.js'
import { createHotline, getAllHotlineNumbers, getSingleNumber } from "../controller/hotlineController.js";

const router = Router()

router.post('/' , async (req: Request , res: Response , next:NextFunction)=>{
    try {
        if(!req.body.hotlineNumber){
            throw new AppError("hotline number is missing", 400 , true)
        }

        const hotline = await createHotline(req.body)
        res.status(201).json({
            msg: "hotline number created successfully" ,
            hotline: hotline
        })

    } catch (error) {
        next(error)
    }
})

router.get('/' , getAllHotlineNumbers)

router.get('/:id' , async(req:Request , res: Response , next: NextFunction)=>{
    try {
        const hotlineNumberId = Number(req.params.id)
        const hotlineNumber = await getSingleNumber(hotlineNumberId)
        res.status(200).json({
            msg: "hotline number found successfully" ,
            hotlineNumber : hotlineNumber
        })
    } catch (error) {
        next(error)
    }
    
})

export default router