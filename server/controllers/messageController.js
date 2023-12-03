const db = require('../models');
const Message = db.messages;
const User = db.users


const addMessage = async(req, res) => {
    const messageInfo = {
        message: req.body.message,
        community_id: req.body.community_id,
        author_id: req.body.author_id,
    };

    const message = await Message.create(messageInfo);
    res.status(200).json({ messageStatus: 'Message created successfully!', message: message });
}

const getAllMessages = async(req, res) => {
    const community_id = req.params.id
    const messages = await Message.findAll({ 
        where: { community_id: community_id }, 
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'profilePic', 'createdAt']
        } 
    });
    res.status(200).json({ messageStatus: 'message fetched successfully!', messages: messages });
}

const getOneMessage = async(req, res) => {
    const message = await Message.findOne({ where: {id: req.params.id} });
    res.status(200).json({ messageStatus: 'message fetched successfully!', message: message });
}



const updateMessage = async(req, res) => {
    const message = await Message.update(req.body, { where: {id: req.params.id} });
    res.status(200).json({ messageStatus: 'message updated successfully!', message: message });
}


const deleteMessage = async(req, res) => {
    const message = await Message.destroy({ where: {id: req.params.id} });
    res.status(200).json({ messageStatus: 'message deleted successfully!', message: message });
}



module.exports = {
    addMessage,
    getAllMessages,
    getOneMessage,
    updateMessage,
    deleteMessage
}

