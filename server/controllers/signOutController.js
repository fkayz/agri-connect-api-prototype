
const signOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'logged out!' });
}

module.exports = signOut;