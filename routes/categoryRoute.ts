import { NextFunction, Router , Request ,Response } from "express";
import { AppError } from "../errors/AppError.js";
import { createCategory, getAllCategories, getSingleCategory } from "../controller/categoryController.js";

const router = Router()

router.post('/' , async(req:Request , res:Response , next:NextFunction)=>{
    try {
        if(!req.body.name){
            throw new AppError("name field is missing" , 400 , true)
        }
    
        const category = await createCategory(req.body)
        res.status(201).json({
            msg: "category created successfully" ,
            category: category
        })
    } catch (error) {
        next(error)
    }
    
})

router.get('/' , getAllCategories)

router.get('/:id' , async(req:Request , res: Response , next: NextFunction)=>{
    try {
        const categoryId = Number(req.params.id)
        const category = await getSingleCategory(categoryId)
        res.status(200).json({
            msg: "category found successfully" ,
            category : category
        })
    } catch (error) {
        next(error)
    }
    
})

export default router