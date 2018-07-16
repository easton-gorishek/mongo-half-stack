const Bagel = require('../models/bagel');

const post = req => Bagel.insert(req.body);
const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Bagel.findOne(id);
const getAll = () => Bagel.find({});




const methods = { post, get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    return method(req, res);
};