const db = require('../models');
const Comment = db.comments;
const User = db.users;
const Post = db.posts


const addComment = async(req, res) => {
    const commentInfo = {
        commentContent: req.body.commentContent,
        post_id: req.body.post_id,
        comment_author_id: req.body.comment_author_id
    };

    const comment = await Comment.create(commentInfo);
    const post = await Post.findOne({ where: { id: comment.post_id } })
    res.status(200).json({ message: 'comment created successfully!', comment: comment, post: post });
}

const getAllComments = async(req, res) => {
    const comments = await Comment.findAll({ include: [User] });
    res.status(200).json({ message: 'comments fetched successfully!', comments: comments });
}

const getOneComment = async(req, res) => {
    const comment_id = req.params.id;
    const comment = await Comment.findOne({ where: {id: comment_id }, include: [User] });
    res.status(200).json({ message: 'comment fetched successfully!', comment: comment });
}

const updateComment = async(req, res) => {
    const comment_id = req.params.id;
    const comment = await Comment.update(req.body, { where: {id: comment_id} });
    res.status(200).json({ message: 'comment updated successfully!', comment: comment });
}

const deleteComment = async(req, res) => {
    const comment_id = req.params.id;
    const comment = await Comment.destroy({ where: {id: comment_id} });
    res.status(200).json({ message: 'comment deleted successfully!', comment: comment });
}


module.exports = {
    addComment,
    getAllComments,
    getOneComment,
    updateComment,
    deleteComment
}