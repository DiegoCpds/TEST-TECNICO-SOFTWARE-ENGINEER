import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: [true, 'El ID del producto ya existe']
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    barcode: {
        type: String,
        required: true,
        unique: [true, 'El código de barras ya existe']
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    carbonImpact: {
        type: Number,
        required: true
    },
    socialImpact: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
