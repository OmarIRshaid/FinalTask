import { Request, Response, Express } from "express";
import express from 'express'
import 'dotenv/config'
import { AppDataSource } from "./db/dbConfig.js";
import { customErrorHandler, DefaultErrorHandler } from "./Middleware/errorHandler.js";
import hotlineRoute from './routes/hotlineRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import shopRoute from './routes/shopRoute.js'


const app: Express = express();
const PORT = process.env.PORT || 5000
app.use(express.json())

// Route.
app.get('/', (req: Request, res: Response) => {
    res.send("hello world");
})

app.use("/hotline" , hotlineRoute)
app.use("/category" , categoryRoute)
app.use("/product" , productRoute)
app.use("/shop" , shopRoute)




app.use(customErrorHandler)
app.use(DefaultErrorHandler)

AppDataSource.initialize().then(()=>{
    console.log("connected to db");
    
}).catch((error)=>{
    console.log("failed to connect to db " + error);
    
})



app.listen(PORT, () => {

    console.log("port is running on the " + PORT);
});

