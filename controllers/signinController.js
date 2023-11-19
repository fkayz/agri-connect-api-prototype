const { compare_password } = require('../helpers/hash_password');
const create_jwt = require('../helpers/create_jwt');
const db = require('../models/index');
const User = db.users;
const Post = db.posts;


const signIn = async (req, res) => {
    const credentials = {
        email: req.body.email,
        password: req.body.password
    };

    try{
        const user = await User.findOne({ where: { email: credentials.email }, include:[Post] });
        
        if(user){
            const isPasswordCorrect = await compare_password(credentials.password, user.password);
            if(isPasswordCorrect){
                const token = create_jwt(user);
                res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 3 * 24, httpOnly: true });
                res.cookie('currentUset', token, { maxAge: 1000 * 60 * 60 * 3 *24, httpOnly: true });
                return res.status(200).json({ user, token })
            }
            return res.status(401).json({ error: 'Invalid password' });
        }else{
            return res.status(400).json({ error: 'User not found' });    
        }
    }catch(err){
        return res.status(400).json({ error: err });
    }
        
}


module.exports = signIn;