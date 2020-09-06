const crypto = require('crypto')
const {
    CRYPTO_SECRECT_KEY
} = require('../conf/secrectKeys')

//md5加密

function md5(content) {
    return crypto.createHash('md5').update(content).digest('hex')
}

function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRECT_KEY}`
    return md5(str)
}

module.exports = {
    doCrypto
}