import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"

import productsRouter from "./services/products/products.js"
import reviewsRouter from "./services/reviews/reviews.js"
import cartRouter from "./services/cart/cart.js"
import { errorHandler } from "./errorHandlers.js"

const server = express()
const PORT = process.env.PORT || 3001
const DB_STRING = process.env.DB_STRING

// ### MIDDLEWARES ###
server.use(cors())
server.use(express.json())
server.use(morgan("dev"))

// ### ENDPOINTS ###

server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)
server.use("/cart", cartRouter)

// ### ERROR HANDLERS ###
server.use(errorHandler)

// ### DATABSE ###
mongoose
  .connect(DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => server.listen(PORT, () => console.log("Server listening on port " + PORT)))
  .catch(err => console.log(err))
