module.exports = (sequelize, DataTypes, Model) => {
    class SavedPost extends Model{};

    SavedPost.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unsigned: true
        },

    }, {sequelize, modelName: 'saved_post'});

    return SavedPost;
}