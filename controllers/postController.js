const db = require('../models/index');
const Post = db.posts;
const User = db.users;
const Like = db.likes;
const Comment = db.comments;


const addPost = async(req, res) => {
    const postInfo = {
        postContent: req.body.postContent,
        postImage: req.body.postImage,
        postVideo: req.body.postVideo,
        post_author_id: req.body.post_author_id
    };

    const post = await Post.create(postInfo);
    const user = await User.findOne({ where: {id: post.post_author_id} })
    res.status(200).json({ message: 'Post created successfully!', post: post, user: user });
}

const getAllPosts = async(req, res) => {
    const posts = await Post.findAll({ include: [ User, Like, {model: Comment, include: [User]} ], order: [['createdAt', 'DESC']] });
    res.status(200).json({ message: 'Post fetched successfully!', posts: posts });
}

const getOnePost = async(req, res) => {
    const post_id = req.params.id;
    const post = await Post.findOne({ where: {id: post_id}, include: [User, Like, Comment] });
    res.status(200).json({ message: 'Post fetched successfully!', post: post });
}

const updatePost = async(req, res) => {
    const post_id = req.params.id;
    const post = await Post.update(req.body, { where: {id: post_id} });
    res.status(200).json({ message: 'Post updated successfully!', post: post });
}

const deletePost = async(req, res) => {
    const post_id = req.params.id;
    const post = await Post.destroy({ where: {id: post_id} });
    res.status(200).json({ message: 'Post deleted successfully!', post: post });
}


module.exports = {
    addPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost
}