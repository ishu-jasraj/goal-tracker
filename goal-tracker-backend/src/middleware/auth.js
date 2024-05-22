const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'myUniqueKey');
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send('please authenticate');
    }
}

module.exports = auth;