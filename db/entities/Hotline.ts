import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import { Shop } from "./Shop.js"

@Entity('hotline')
export class Hotline extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column()
    hotlineNumber: string

    @OneToOne(()=> Shop , shop => shop.hotlineNumber) 
    shop : Partial<Shop>
}