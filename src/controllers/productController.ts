import { Request, Response } from 'express';
import Product from '../models/productModel';
import { setCache, getCache } from '../utils/redis';

// Get all products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const cacheKey = 'products';
    const cachedProducts = await getCache(cacheKey);

    if (cachedProducts) {
      res.status(200).json(cachedProducts);
      return;  // Explicitly return here
    }

    const products = await Product.find();
    await setCache(cacheKey, products, 3600); // Cache for 1 hour
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, quantity } = req.body;
    const newProduct = new Product({ name, description, price, category, quantity });
    const savedProduct = await newProduct.save();

    await setCache('products', await Product.find(), 3600); // Refresh cache
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error creating product' });
  }
};

// Update an existing product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;  // Explicitly return here
    }

    await setCache('products', await Product.find(), 3600); 
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;  // Explicitly return here
    }

    await setCache('products', await Product.find(), 3600); // Refresh cache
    res.status(204).send(); // Use `send` for 204 status
  } catch (err) {
    res.status(400).json({ error: 'Error deleting product' });
  }
};
