const mongo = require('../mongodb');
// const { ObjectId } = require('mongodb');

module.exports = {
    insert(bagel) {
        return mongo.then(db => {
            return db.collection('bagels')
                .insertOne(bagel)
                .then(result => result.ops[0]);
        });
    }
};