import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { Product } from "./Product.js"

@Entity('category')
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column()
    name: string 

    @ManyToMany(()=> Product , Product => Product.categories)
    product: Product[]

    
    
}