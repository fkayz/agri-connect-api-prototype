module.exports = (sequelize, DataTypes, Model) => {
    class Like extends Model{};

    Like.init({

    }, {sequelize, modelName: 'like', timestamps: true, updatedAt: false});

    return Like;
}