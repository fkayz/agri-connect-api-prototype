const db = require('../models');
const ProductStatus = db.product_status;


const addProductStatus = async(req, res) => {
    const productStatusInfo = {
        status: req.body.status
    };

    const productStatus = await ProductStatus.create(productStatusInfo);
    res.status(200).json({ message: 'Product status created successfully!', productStatus: productStatus });
}

const getAllProductStatus = async(req, res) => {
    const productStatus = await ProductStatus.findAll({});
    res.status(200).json({ message: 'Product status fetched successfully!', productStatus: productStatus });
}

const getOneProductStatus = async(req, res) => {
    const productStatus = await ProductStatus.findOne({ where: {id: req.params.id} });
    res.status(200).json({ message: 'Product status fetched successfully!', productStatus: productStatus });
}

const updateProductStatus = async(req, res) => {
    const product_status = await ProductStatus.update(req.body, { where: {id: req.params.id} });
    res.status(200).json({ message: 'Product status updated successfully!' });
}

const deleteProductStatus = async(req, res) => {
    const productStatus = await ProductStatus.destroy({ where: {id:req.params.id} });
    res.status(200).json({ message: 'Product status deleted successfully!', productStatus: productStatus });
}




module.exports = {
    addProductStatus,
    getAllProductStatus,
    getOneProductStatus,
    updateProductStatus,
    deleteProductStatus
}