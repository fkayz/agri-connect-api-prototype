module.exports = (sequelize, DataTypes, Model) => {
    class Message extends Model{};

    Message.init({
        message: { type: DataTypes.TEXT },
    }, {sequelize, modelName: 'message'});

    return Message;
}