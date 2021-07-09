import mongoose from "mongoose"

const { Schema, model } = mongoose

const CartSchema = new Schema(
  {
    products: [
      new Schema([
        {
          product: { type: Schema.Types.ObjectId, ref: "Product" },
          quantity: Number,
        },
        { _id: false },
      ]),
    ],
    status: { type: String, enum: ["active", "paid", "cancelled"], default: "active" },
  },
  {
    timestamps: true,
  }
)

export default model("Cart", CartSchema)
