const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const likeRouter = require('./routes/likeRouter');
const productRouter = require('./routes/productRouter');
const productStatusRouter = require('./routes/productStatusRouter');
const communityRouter = require('./routes/communityRouter');
const messageRouter = require('./routes/messageRouter');
const followRouter = require('./routes/followRouter');
const signInRouter = require('./routes/signInRouter');
const signOutRouter = require('./routes/signOutRouter');
const savedPostRouter = require('./routes/savedPostRouter');


// middleware
const corsOption = { 
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200 
}

app.use(cors(corsOption));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

// app routes
app.use('/api/users/', userRouter);
app.use('/api/posts/', postRouter);
app.use('/api/comments/', commentRouter);
app.use('/api/likes/', likeRouter);
app.use('/api/products/', productRouter);
app.use('/api/product_status/', productStatusRouter);
app.use('/api/communities/', communityRouter);
app.use('/api/groups/messages/', messageRouter);
app.use('/api/follows', followRouter);
app.use('/api/users/login/', signInRouter);
app.use('/api/users/logout', signOutRouter);
app.use('/api/save_post/', savedPostRouter);


// spin up the server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
})

