const basicAuth = require('express-basic-auth');
const config = require('config');

module.exports = basicAuth({
    users: {
        [config.auth.user]: config.auth.password
    },
    unauthorizedResponse: function (req) {
        if (req.auth) {
            return {error: "Incorrect credentials provided"};
        } else {
            return {error: "No credentials provided"}
        }
    }
});