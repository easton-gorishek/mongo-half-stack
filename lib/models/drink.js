const mongo = require('../mongodb');
//const { ObjectId } = require('mongodb');

module.exports = {
    insert(drink) {
        return mongo.then(db => {
            return db.collection('coffee')
                .insertOne(drink)
                .then(result => result.ops[0]);
        });
    }
};