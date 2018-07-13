const Drink = require('../models/drink');

const post = req => Drink.insert(req.body);
 

    

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    return method(req, res);
};