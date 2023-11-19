const jwt = require('jsonwebtoken');



const authenticateRoute = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'agc', (err, decodedToken) => {
            if(err) return res.status(401).json({ error: 'login to access the api route' })

            next();
        })
    }else{
        return res.status(401).json({ error: 'login to access the api route' })
    }
}

module.exports = authenticateRoute;