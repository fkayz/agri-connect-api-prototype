const db = require('../models/index');
const SavedPost = db.saved_posts
const Post = db.posts;
const User = db.users;
const Comment = db.comments
const Like = db.likes

const savePost = async(req, res) => {
    const savedPostInfo = {
        user_id: req.body.user_id,
        post_id: req.body.post_id,
    };

    const savedPost = await SavedPost.create(savedPostInfo);
    res.status(200).json({ message: 'Saved post successfully!', post: savedPost });
}

const getAllSavedPosts = async(req, res) => {
    const posts = await SavedPost.findAll({ 
        include: [ 
            // { model: User, attributes: ['id'] },  
            {model: Post, include: [User, {model: Comment, include: [User]}, Like]} 
        ], 
        order: [['createdAt', 'DESC']] 
    });
    res.status(200).json({ message: 'Post fetched successfully!', posts: posts });
}


const deleteSavedPost = async(req, res) => {
    const post_id = req.params.id;
    const post = await SavedPost.destroy({ where: {id: post_id} });
    res.status(200).json({ message: 'Post deleted successfully!', post: post });
}


module.exports = {
    savePost,
    getAllSavedPosts,
    deleteSavedPost,
}