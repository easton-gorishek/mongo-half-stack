const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(bagel) {
        return mongo.then(db => {
            return db.collection('bagels')
                .insertOne(bagel)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('bagels')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('bagels')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('bagels')
                .removeOne({ _id: ObjectId(id) });
        });
    }
    
};