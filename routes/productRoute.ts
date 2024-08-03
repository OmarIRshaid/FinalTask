import { NextFunction, Router , Request ,Response } from "express";
import { AppError } from "../errors/AppError.js";
import { createProduct, getAllProducts, getSingleproduct } from "../controller/productController.js";


const router = Router()

router.post('/' , async(req: Request , res: Response , next:NextFunction)=>{
    try {
        if(!req.body.price || !req.body.name || !req.body.shopId || !req.body.categoriesId){
            throw new AppError("some fields are missing" , 400 , true)
        }
    
        const product = await createProduct(req.body , req.body.shopId , req.body.categoriesId)
        res.status(201).json({
            msg: "product created successfully" ,
            product: product
        })
    } catch (error) {
        next(error)
    }
    
})

router.get('/' , getAllProducts)

router.get('/:id' , async(req:Request , res: Response , next: NextFunction)=>{
    try {
        const productId = Number(req.params.id)
        const product = await getSingleproduct(productId)
        res.status(200).json({
            msg: "product found successfully" ,
            product : product
        })
    } catch (error) {
        next(error)
    }
    
})

export default router