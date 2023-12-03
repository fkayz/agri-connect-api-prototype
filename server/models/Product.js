module.exports = (sequelize, DataTypes, Model) => {
    class Product extends Model{};

    Product.init({
        name: {
            type: DataTypes.STRING,
        },
        
        description: {
            type: DataTypes.TEXT
        },

        price: {
            type: DataTypes.FLOAT
        },

        productImage: {
            type: DataTypes.STRING
        },
    }, {sequelize, modelName: 'product'});

    return Product;
}