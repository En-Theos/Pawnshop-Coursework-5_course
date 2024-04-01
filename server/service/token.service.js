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

    validateAccessToken(token) {
        try {
            return jwt.verify(token, "jwt_access_secret_key")
        } catch (err) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, "jwt_refresh_secret_key")
        } catch (err) {
            return null
        } 
    }

    async saveToken(userEmail, refreshToken) {
        const connection = await getConnection();

        const [result] = await connection.query(`
            UPDATE users
            SET refresh_token = ?
            WHERE email = ?`, [refreshToken, userEmail]
        );

        return result
    }

    async removeToken(refreshToken) {
        const connection = await getConnection();

        const [result] = await connection.query(`
            UPDATE users
            SET refresh_token = NULL
            WHERE refresh_token = ?`, [refreshToken]
        );
    }

    async findToken(refreshToken) {
        const connection = await getConnection();

        const [rows] = await connection.execute(`
            SELECT * FROM users
            WHERE refresh_token = ?`, [refreshToken]
        );

        if (rows.length !== 0) {
            return rows
        } else {
            return null
        }
    }
}

module.exports = new TokenService()