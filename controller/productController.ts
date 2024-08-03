import { In } from "typeorm";
import { Category } from "../db/entities/Category.js";
import { Product } from "../db/entities/Product.js";
import { Shop } from "../db/entities/Shop.js";
import { AppError } from "../errors/AppError.js";
import { Request , Response } from "express";

const createProduct = async(payload: Product , shopId: string , categoriesId: Category[])=>{
    const shop = await Shop.findOne({where: {id: shopId}})

    if(!shop){
        throw new AppError("this shop does not exist" , 404 , true)
    }

    const categories = await Category.find({where: {id: In(categoriesId)}})

    if(categories.length != categoriesId.length){
        throw new AppError("some categories does not exist" , 404 , true)
    }

    const product = await Product.findOne({where: {name: payload.name}})
    if(product){
        throw new AppError("this product already exist" , 409 , true)
    }

    const newProduct = await Product.create({
        ...payload ,
        shop ,
        categories
        
    }).save()

    return newProduct
}

const getAllProducts = async(req: Request , res: Response)=>{
    const products = await Product.find()

    res.status(200).json({
        msg: "All products" ,
        products: products
    })
}

const getSingleproduct = async(productId: number)=>{
    const product = await Product.findOne({where: {id: productId}})
    
    if(!product){
        throw new AppError("this product does not exist" , 404 , true)
    }

    return product
}

export {createProduct , getAllProducts , getSingleproduct}