import { Category } from "../db/entities/Category.js";
import { AppError } from "../errors/AppError.js";
import { Request , Response } from "express";

const createCategory = async(payload: Category)=>{
    const category = await Category.findOne({where: {name: payload.name}})

    if(category){
        throw new AppError("this category already exist" , 409 , true)
    }

    const newCategory = await Category.create(payload).save()
    
    return newCategory
}

const getAllCategories = async(req: Request ,res: Response)=>{
    const categories = await Category.find()

    res.status(200).json({
        msg: "All categories",
        categories: categories
    })
}

const getSingleCategory = async(categoryId: number)=>{
    const category = await Category.findOne({where: {id: categoryId}})
    if(!category){
        throw new AppError("category does not exist" , 404 , true)
    }

    return category
}

export {createCategory , getAllCategories , getSingleCategory}