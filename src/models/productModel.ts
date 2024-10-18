import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  quantity: number;
  brand: string;
  category: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true }, // Set required to true
  price: { type: Number, required: true, min: 0 }, // Set required to true and min to 0
  description: { type: String, required: false },
  quantity: { type: Number, required: false, min: 0, default: 0 }, // Default value for quantity
  brand: { type: String, required: false },
  category: { type: String, required: true }, // Set required to true
});

// Optionally, you can add indexes for improved performance
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });

const Product = model<IProduct>('Product', productSchema);
export default Product;
