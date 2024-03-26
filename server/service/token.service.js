const jwt = require('jsonwebtoken');
const getConnection = require('../database');

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, "jwt_access_secret_key", {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, "jwt_refresh_secret_key", {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const connection = await getConnection();

        const [result] = await connection.query(`
            UPDATE users
            SET refresh_token = ?
            WHERE id = ?`, [refreshToken, userId]
        );

        return result
    }
}

module.exports = new TokenService()