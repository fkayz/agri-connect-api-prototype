const db = require('../models');
const Like = db.likes;


const addLike = async(req, res) => {
    const likeInfo = {
        user_id: req.body.user_id,
        post_id: req.body.post_id
    };

    const like = await Like.create(likeInfo);
    res.status(200).json({ message: 'Post liked successfully!', like: like });
}

const getAllLikes = async(req, res) => {
    const likes = await Like.findAll({});
    res.status(200).json({ message: 'Likes fetched successfully!', likes: likes });
}

const getOneLike = async(req, res) => {
    const like_id = req.params.id;
    const like = await Like.findOne({ where: {id: like_id} });
    res.status(200).json({ message: 'Post like fetched successfully!', like: like });
}

const updateLike = async(req, res) => {
    const like_id = req.params.id;
    const like = await Like.update(req.body, { where: {id: like_id} });
    res.status(200).json({ message: 'Post like updated successfully!', like: like });
}

const deleteLike = async(req, res) => {
    const like_id = req.params.id;
    const like = await Like.destroy({ where: {id: like_id} });
    res.status(200).json({ message: 'Post like deleted successfully!',  });
}

module.exports = {
    addLike,
    getAllLikes,
    getOneLike,
    updateLike,
    deleteLike
}
