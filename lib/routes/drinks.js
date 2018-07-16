const Drink = require('../models/drink');

const post = req => Drink.insert(req.body);
const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Drink.findOne(id);
const getAll = () => Drink.find({});

    

const methods = { post, get };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    return method(req, res);
};