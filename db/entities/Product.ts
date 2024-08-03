import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Shop } from "./Shop.js"
import { Category } from "./Category.js"

@Entity('product')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number 

    @Column()
    name: string 

    @Column()
    price: number 

    @ManyToOne(()=> Shop , shop => shop.product)
    shop: Partial<Shop>

    @ManyToMany(()=> Category , category => category.product)
    @JoinTable({
        name: 'product-category'
    })

    categories: Category[]

    
    
}