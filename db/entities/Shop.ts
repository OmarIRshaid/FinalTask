import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm"
import { Hotline } from "./Hotline.js"
import { Product } from "./Product.js"

@Entity('shop')
export class Shop extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column()
    shopName: string 

    @Column()
    email: string 

    @Column()
    password: string 

    @OneToOne(()=> Hotline , hotlineNumber => hotlineNumber.shop)
    @JoinColumn({
        name: "hotlineId",
        referencedColumnName: 'id'
    })   
    hotlineNumber: Hotline

    @OneToMany(()=> Product , product => product.shop)
    product: Partial<Product>[]
    
}