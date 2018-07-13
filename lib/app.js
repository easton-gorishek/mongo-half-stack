const { parse } = require('url');
const coffee = require('./routes/drinks');
const bodyParser = require('./body-parser');
//const notFound = require('./routes/not-found');

const routes = {
    coffee
};

module.exports = (req, res) => {
    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.path = parsedUrl.pathname.slice(1).split('/');
    const resource = req.path[0];
    req.id = req.path[1]; 

    res.setHeader('Content-Type', 'application/json');
    res.send = obj => res.end(JSON.stringify(obj));

    const route = routes[resource];
    console.log('ROUTE', route);
    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req, res)
                .then(data => res.send(data))
                .catch(err => {
                    console.log(err);
                    res.statusCode = err.statusCode || 500;
                    res.send({
                        error: err.statusCode ? err.message : 'Unexpected error occurred'
                    });
                });
        });
};

