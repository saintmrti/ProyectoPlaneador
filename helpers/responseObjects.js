const _ = require('lodash');

module.exports.successObj = (data, status) => ({
    isError: false, 
    isEmpty: _.isEmpty(data), 
    data, 
    status,
});

module.exports.errorObj = status => ({
    isError: true, 
    status,
});