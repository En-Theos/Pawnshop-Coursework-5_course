const getConnection = require('../database');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');

class UserService {
    async registration(email, password) {
        const connection = await getConnection();

        const [rows, fields] = await connection.execute(`
            SELECT * FROM users
            WHERE email = "${email}"
        `);

        if (rows.length > 0) {
            throw new Error("Користувач уже існує")
        }

        const activationLink = uuid.v4()

        const [result] = await connection.query(`
            INSERT INTO users (email, password, activationLink)
            VALUES (?, ?, ?)`, [email, password, activationLink]
        );

        await mailService.sendActivationMail(email, activationLink);

        const [user] = await connection.execute(`
            SELECT * FROM users
            WHERE email = "${email}"
        `);

        const tokens = tokenService.generateToken({
            id: user[0].id, 
            email: user[0].email, 
            isActivated: user[0].isActivated
        });
        await tokenService.saveToken(user[0].id, tokens.refreshToken);

        return {...tokens, user: {
            id: user[0].id, 
            email: user[0].email, 
            isActivated: user[0].isActivated
        }}
    }
}

module.exports = new UserService();