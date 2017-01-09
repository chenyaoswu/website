var controller = require('../controller/index');
module.exports = function*(next) {
    console.log('index');


    yield next;
    return;
};