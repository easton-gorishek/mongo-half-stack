const { parse } = require('url');
const drinks = require('./routes/drinks');
const bodyParser = require('./body-parser');
//const notFound = require('./routes/not-found');

const routes = {
    drinks
};

module.exports = (req, res) => {
    const parsedUrl = parse(req.url, true);
    req.query = parsedUrl.query;
    req.paths = parsedUrl.pathname.slice(1).split('/');
    const resource = req.path[0];
    req.id = req.paths[1];

    console.log('LOOK HERE', req.paths);

    res.setHeader('Content-Type', 'application/json');
    res.send = obj => res.end(JSON.stringify(obj));

    const route = routes[resource];

    bodyParser(req)
        .then(body => {
            req.body = body;
            route(req.res)
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

