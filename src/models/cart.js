import mongoose from "mongoose"

const { Schema, model } = mongoose

const CartSchema = new Schema(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    status: { type: String, enum: ["active", "paid", "cancelled"], default: "active" },
  },
  {
    timestamps: true,
  }
)

export default model("Cart", CartSchema)
