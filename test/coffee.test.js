const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Coffee API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('coffee').remove();
        });
    });

    let drink;

    beforeEach(() => {
        const data = {
            name: 'White Mocha',
            price: 3.50,
            size: 'Grande'
        };
        

        return request
            .post('/coffee')
            .send(data)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.name, data.name);
                drink = body;
            });
    });


    it('saves a drink', () => {
        assert.ok(drink._id);
    });

    it('gets a coffee by id', () => {
        return request
            .get(`/coffee/${drink._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, drink);
            });
    });

});