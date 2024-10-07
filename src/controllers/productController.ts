import { Request, Response } from 'express';
import Product from '../models/productModel';
import { getCache, setCache } from '../cache';

const CACHE_DURATION = 3600; // cache expiration  for 1 hour


export const getProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const cachedProduct = await getCache(`product:${productId}`);
    if (cachedProduct) {
      res.status(200).json({ source: 'cache', product: cachedProduct });
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }


    await setCache(`product:${productId}`, product, CACHE_DURATION);
    res.status(200).json({ source: 'database', product });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, description } = req.body;

  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();


    await setCache(`product:${newProduct._id}`, newProduct, CACHE_DURATION);

    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

  
    await setCache(`product:${productId}`, updatedProduct, CACHE_DURATION);

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await getCache(`product:${productId}`);

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
