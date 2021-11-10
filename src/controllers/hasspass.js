const bCrypt = require('bcrypt');

const isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
}
let createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = { isValidPassword, createHash }