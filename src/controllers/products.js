import createError from "http-errors"
import ProductModel from "../models/products.js"

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find()
    res.json(products)
  } catch (error) {
    res.json(error)
  }
}
export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.prodId)
    if (!product) return res.status(404).json({ message: `Product with id ${req.params.prodId} not found` })
    res.json(product)
  } catch (error) {
    res.json(error)
  }
}
export const addNewProduct = async (req, res, next) => {
  const productData = { ...req.body }
  const newProduct = new ProductModel(productData)
  try {
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res.json(newProduct)
  }
}
export const editProduct = async (req, res, next) => {
  const update = req.body
  try {
    const updatedProd = await ProductModel.findByIdAndUpdate(req.params.prodId, update, { new: true, runValidators: true })
    if (!updatedProd) return res.status(404).json({ message: `Product with id ${req.params.prodId} not found` })
    res.json(updatedProd)
  } catch (error) {
    res.json(error)
  }
}
export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProd = await ProductModel.findByIdAndRemove(req.params.prodId)
    if (!deletedProd) return res.status(404).json({ message: `Product with id ${req.params.prodId} not found` })
    res.json({ deletedProd })
  } catch (error) {
    res.json(error)
  }
}
export const uploadProductImage = async (req, res, next) => {
  try {
  } catch (error) {}
}