module.exports = (sequelize, DataTypes, Model) => {
    class Community extends Model{};

    Community.init({
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        profileCover: { type: DataTypes.STRING }
    }, {sequelize, modelName: 'community', freezeTable: true});

    return Community;
}