import { Request, Response } from 'express';
import Product from '../models/productModel';

// CREATE Product
export const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating product', error });
  }
};

// READ Product
export const getProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching product', error });
  }
};

// UPDATE Product
export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, { name, price, description }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error });
  }
};

// DELETE Product
export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting product', error });
  }
};
