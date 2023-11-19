const jwt = require('jsonwebtoken');


const generate_jwt = (user) => {
    const secret_key = 'agc'
    return jwt.sign({ userID: user.id, userEmail: user.email }, secret_key, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

module.exports = generate_jwt;