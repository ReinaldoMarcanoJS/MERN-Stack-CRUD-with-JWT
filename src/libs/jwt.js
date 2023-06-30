const { TOKEN_SECRET } = require('../config')
const jwt = require("jsonwebtoken")

async function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(token)
                }

            })
    })
}

module.exports = createAccessToken 