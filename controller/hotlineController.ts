import {Hotline} from '../db/entities/Hotline.js'
import { AppError } from '../errors/AppError.js'
import {Request , Response} from 'express'

const createHotline = async(payload: Hotline)=>{
    const hotline = await Hotline.findOne({where: {hotlineNumber: payload.hotlineNumber}})

    if(hotline){
        throw new AppError("hotline number already exist" , 409 , true)
    }

    const newHoltine = await Hotline.create(payload).save()
    return newHoltine
}

const getAllHotlineNumbers = async(req:Request , res:Response)=>{
    const hotlineNumbers = await Hotline.find()

    res.status(200).json({
        msg: "All Hotline Numbers" ,
        HotlineNumbers : hotlineNumbers
    })
}

const getSingleNumber = async(hotlineNumberId : number)=>{

    const hotlineNumber = await Hotline.findOne({where: {id: hotlineNumberId}})

    if(!hotlineNumber){
        throw new AppError("hotline number does not exist" , 404 , true)
    }

    return hotlineNumber
    
}

export {createHotline , getAllHotlineNumbers , getSingleNumber}