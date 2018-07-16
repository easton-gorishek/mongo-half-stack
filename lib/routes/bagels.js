const Bagel = require('../models/bagel');

const post = req => Bagel.insert(req.body);

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    return method(req, res);
};