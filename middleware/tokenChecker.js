const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const configToken = require('../config.json');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if(token) {
        jwt.verify(token, configToken.secret, function(err, decoded){
            if (err){
                return res.status(401).json({
                    "error": true, "message": 'Unauthorized access'
                });
            }
            req.decoded = decoded;
            next();
            
        });
    } else {
        return res.status(403).send({
            "error": true,
            "message": 'No Token Provided'
        });
    }
}