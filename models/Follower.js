module.exports = (sequelize, DataTypes, Model) => {
    class Follower extends Model{};

    Follower.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        }
    }, {sequelize, modelName: 'follower', freezeTable: true});

    return Follower;
}