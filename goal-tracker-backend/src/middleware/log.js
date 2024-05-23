const Log = require('../models/Log');

const log = async (req, res, next) => {
    try {
        const { url, method } = req;
        const log = new Log({
            payload: url,
            op_type: method
        })
        await log.save();
        next();
    }
    catch (e) {

    }
}

module.exports = log;