if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys_prod');
} else{
    try {
        module.exports = require('./keys_dev');
    } catch (e) {
        // Fallback to env-based config if keys_dev.js is not present
        module.exports = require('./keys_prod');
    }
}