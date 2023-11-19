const db = require('../models');
const Community = db.communities;
const User = db.users;


const addCommunity = async(req, res) => {
    const communityInfo = {
        admin_id: req.body.admin_id,
        name: req.body.name,
        description: req.body.description,
        profileCover: req.body.profileCover
    };

    const community = await Community.create(communityInfo);
    res.status(200).json({ message: 'Community created successfully!', community: community });
}

const getAllCommunities = async(req, res) => {
    const communities = await Community.findAll({ include: [User] });
    res.status(200).json({ message: 'Communities fetched successfully!', communities: communities });
}

const getOneCommunity = async(req, res) => {
    const community = await Community.findOne({ where: {id: req.params.id} });
    res.status(200).json({ message: 'Community fetched successfully!', community: community });
}

const updateCommunity = async(req, res) => {
    const community = await Community.update(req.body, { where: {id: req.params.id} });
    res.status(200).json({ message: 'Community updated successfully!', community: community });
}


const deleteCommunity = async(req, res) => {
    const community = await Community.destroy({ where: {id: req.params.id} });
    res.status(200).json({ message: 'Community deleted successfully!', community: community });
}



module.exports = {
    addCommunity,
    getAllCommunities,
    getOneCommunity,
    updateCommunity,
    deleteCommunity
}

