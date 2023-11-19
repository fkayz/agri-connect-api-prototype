const db = require('../models')
const Follow = db.followers



const addFollow = async(req, res) => {
    const data = {
        followed_id: req.body.followed_id,
        follower_id: req.body.follower_id
    }

    const follow = await Follow.create(data);
    res.status(200).json({ message: 'followed user sucessfully', data: follow })
}

const getAllFollows = async(req, res) => {
    const follows = await Follow.findAll({})
    res.status(200).json({ message: 'follows fetched sucessfully!', data: follows })
}

const getOneFollow = async (req, res) => {
    const follow_id = req.params.id
    const follow = await Follow.findOne({ where: { id: follow_id } })
}

const updateFollow = async (req, res) => {
    const follow_id = req.params.id
    const data = {
        followed_id: req.body.followed_id,
        follower_id: req.body.follower_id
    }
    const follow = await Follow.update(data, { where: { id: follow_id } })
    res.status(200).json({ message: 'updated successfully!', data: follow })
}


const deleteFollow = async (req, res) => {
    const follow_id = req.params.id
    const follow = await Follow.delete({ where: { id: follow_id } })
    res.status(200).json({ message: 'deleted successfully', data: follow })
}


module.exports = {
    addFollow,
    getAllFollows,
    getOneFollow,
    updateFollow,
    deleteFollow
}