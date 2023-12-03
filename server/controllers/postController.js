const db = require('../models/index');
const { Op } = require('sequelize')
const Post = db.posts;
const Follow = db.followers
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

// const getAllPosts = async(req, res) => {
//     const posts = await Post.findAll({ include: [ User, Like, {model: Comment, include: [User]} ], order: [['createdAt', 'DESC']] });
//     res.status(200).json({ message: 'Post fetched successfully!', posts: posts });
// }

const getAllPosts = async(req, res) => {
    const follower_user_id = req.params.id
    const followed_users = await Follow.findAll({ where: { follower_id: follower_user_id} })

    let followed_usrs_list = []
    let followed_users_id_list = []
    // get all the followed users and store them in the followed users list
    followed_users?.map((usr) => followed_usrs_list.push(usr))
    // get all followed_users and store their respective ids in the followed users id list
    followed_usrs_list?.map((usr) => {followed_users_id_list.push(usr.dataValues.followed_id)})
    const newUsers = [1,2,3, ...followed_users_id_list]
    console.log('followed user id list', newUsers)
    const posts = await Post.findAll({ 
        where: { post_author_id: { [Op.in]: [0, ...followed_users_id_list] }},
        include: [ User, Like, {model: Comment, include: [User]} ],
        order: [['createdAt', 'DESC']],  
    });
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