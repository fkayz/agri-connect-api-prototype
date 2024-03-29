module.exports = (sequelize, DataTypes, Model) => {
    class ProductStatus extends Model{};

    ProductStatus.init({
        status: { type: DataTypes.STRING }
    }, {sequelize, modelName: 'product_status', timestamps: false });

    return ProductStatus;
}