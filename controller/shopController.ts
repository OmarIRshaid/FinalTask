import { NextFunction } from "express";
import { Hotline } from "../db/entities/Hotline.js";
import { Shop } from "../db/entities/Shop.js";
import { AppError } from "../errors/AppError.js";
import bcrypt from "bcrypt"
import { Request , Response } from "express";

const createShop = async(payload: Shop , hotlineId: number)=>{
    const hotline = await Hotline.findOne({where: {id: hotlineId}})

    if(!hotline){
        throw new AppError("hotline number does not exist" , 404 , true)
    }

    let shop = await Shop.findOne({where: {email: payload.email}})

    if(shop){
        throw new AppError("shop already exist" , 409 , true)
    }

    shop = await Shop.findOne({where: {hotlineNumber: hotline}})

    if(shop){
        throw new AppError("this hotline number is already used with another shop" , 409 , true)
    }

    payload.password = await bcrypt.hash(payload.password , 10)

    const newShop = await Shop.create({
        ...payload ,
        hotlineNumber : hotline
    }).save()

    return newShop
}

const getAllShops = async(req:Request , res:Response)=>{
    const shops = await Shop.find()

    res.status(200).json({
        msg: "All shops",
        shops: shops
    })
}

const getSingleshop = async(shopId: string)=>{
    
    const shop = await Shop.findOne({where: {id: shopId} })
    if(!shop){
        throw new AppError("shop does not exist" , 404 , true)
    }

    return shop
}

export {createShop , getAllShops , getSingleshop}