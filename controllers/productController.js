const db = require('../models');
const Product = db.products;
const User = db.users;
const ProductStatus = db.product_status;

const addProduct = async(req, res) => {
    const productInfo = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productImage: req.body.productImage,
        product_owner_id: req.body.product_owner_id,
        product_status_id: req.body.product_status_id
    };

    const product = await Product.create(productInfo);
    res.status(200).json({ message: 'Product created successfully!', product: product });
}

const getAllProducts = async(req, res) => {
    const products = await Product.findAll({ include: [User, ProductStatus], order: [['createdAt', 'DESC']] });
    res.status(200).json({ message: 'Products fetched successfully!', products: products });
}

const getOneProduct = async(req, res) => {
    const product_id = req.params.id;
    const product = await Product.findOne({ where: {id:product_id}, include: [User, ProductStatus], order: [['createdAt', 'DESC']] });
    res.status(200).json({ message: 'Product fetched successfully!', product: product });
}

const updateProduct = async(req, res) => {
    const product_id = req.params.id;
    const product = await Product.update(req.body, { where: {id:product_id} });
    res.status(200).json({ message: 'Product updated successfully!', product: product });
}

const deleteProduct = async(req, res) => {
    const product_id = req.params.id;
    const product = await Product.destroy({ where: {id:product_id} });
    res.status(200).json({ message: 'Product deleted successfully!', product: product });
}



module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}

