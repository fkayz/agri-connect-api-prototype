module.exports = (sequelize, DataTypes, Model) => {
    class Comment extends Model{};

    Comment.init({
        commentContent: {
            type: DataTypes.TEXT
        }
    }, {sequelize, modelName: 'comment'});

    return Comment;
}