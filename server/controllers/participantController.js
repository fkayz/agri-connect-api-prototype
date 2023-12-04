const db = require('../models');
const CommunityParticipant = db.community_participants;
const User = db.users
const Community = db.communities


const addCommunityParticipant = async(req, res) => {
    const communityParticipantInfo = {
        community_id: req.body.community_id,
        user_id: req.body.user_id,
    };

    const community = await CommunityParticipant.create(communityParticipantInfo);
    res.status(200).json({ messageStatus: 'Community created successfully!', community: community });
}

const getAllCommunityParticipant = async(req, res) => {
    const community_id = req.params.id
    const communities = await CommunityParticipant.findAll({ 
        where: { community_id: community_id }, 
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'profilePic', 'createdAt']
        } 
    });
    res.status(200).json({ messageStatus: 'Communities fetched successfully!', communities: communities });
}

const getAllCommunityParticipants = async(req, res) => {
    const communities = await CommunityParticipant.findAll({ 
        include: [User, Community],
        where: { user_id: req.params.id }
    });
    res.status(200).json({ messageStatus: 'Communities fetched successfully!', communities: communities });
}

const getOneCommunityParticipant = async(req, res) => {
    const communityParticipant = await CommunityParticipant.findOne({ where: {id: req.params.id} });
    res.status(200).json({ messageStatus: 'Community fetched successfully!', communityParticipant: communityParticipant });
}



const updateCommunityParticipant = async(req, res) => {
    const communityParticipant = await CommunityParticipant.update(req.body, { where: {id: req.params.id} });
    res.status(200).json({ messageStatus: 'Community participant updated successfully!', communityParticipant: communityParticipant });
}


const deleteCommunityParticipant = async(req, res) => {
    const communityParticipant = await CommunityParticipant.destroy({ where: {id: req.params.id} });
    res.status(200).json({ messageStatus: 'Community participant deleted successfully!', communityParticipant: communityParticipant });
}



module.exports = {
    addCommunityParticipant,
    getAllCommunityParticipant,
    getAllCommunityParticipants,
    getOneCommunityParticipant,
    updateCommunityParticipant,
    deleteCommunityParticipant
}

