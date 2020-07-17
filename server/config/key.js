if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    console.log(require('./dev'));
    module.exports = require('./dev');
}