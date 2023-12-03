const db = require('./index');

module.exports = (sequelize, DataTypes, Model) => {
    class CommunityParticipant extends Model{};


    CommunityParticipant.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, { sequelize, modelName: 'community_participant' });

    return CommunityParticipant;
}