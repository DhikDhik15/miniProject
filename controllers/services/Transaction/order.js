'use strict';

const axios = require('axios').default;
/*GET*/
exports.getProduct = async function (req, res){
    axios.get('http://localhost:8001/getProducts')
        .then(function (response){
            res.status(200).json({
                message: 'Product',
                data: response.data
            })
            .catch(function (error){
                res.status(500).json({
                    message: error.message
                })
            })
        })
}

