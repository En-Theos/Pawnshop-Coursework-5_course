const getConnection = require('../database');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const ApiError = require('../api-error');
const bcrypt = require('bcrypt')

class UserService {
    async registration(email, password) {
        const connection = await getConnection();

        const [rows, fields] = await connection.execute(`
            SELECT * FROM users
            WHERE email = "${email}"
        `);

        if (rows.length !== 0) {
            throw ApiError.BadRequest("Користувач з таким email уже існує")
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4()

        const [result] = await connection.query(`
            INSERT INTO users (email, password, activationLink)
            VALUES (?, ?, ?)`, [email, hashPassword, activationLink]
        );

        await mailService.sendActivationMail(email, "http://localhost:3001/user/activate/" + activationLink);

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

    async activate(activationLink) {
        const connection = await getConnection();

        const [rows] = await connection.execute(`
            SELECT * FROM users
            WHERE activationLink = "${activationLink}"
        `);

        if (rows.length === 0) {
            throw ApiError.BadRequest("Недійсне посилання для активації")
        }

        await connection.query(`
            UPDATE users
            SET isActivated = 1
            WHERE activationLink = ?`, [activationLink]
        );

        const tokens = tokenService.generateToken({
            id: rows[0].id,
            email: rows[0].email,
            isActivated: rows[0].isActivated
        });
        await tokenService.saveToken(rows[0].email, tokens.refreshToken);

        return {
            ...tokens, user: {
                id: rows[0].id,
                email: rows[0].email,
                isActivated: rows[0].isActivated
            }
        }
    }

    async login(email, password) {
        const connection = await getConnection();

        const [rows, fields] = await connection.execute(`
            SELECT * FROM users
            WHERE email = "${email}"
        `);

        if (rows.length === 0) {
            throw ApiError.BadRequest("Користувача з таким email не знайдено");
        }

        const isPassEquals = await bcrypt.compare(password, rows[0].password);

        if (!isPassEquals) {
            throw ApiError.BadRequest("Невірний пароль");
        }

        const tokens = tokenService.generateToken({
            id: rows[0].id,
            email: rows[0].email,
            isActivated: rows[0].isActivated
        });
        await tokenService.saveToken(rows[0].email, tokens.refreshToken);

        return {
            ...tokens, user: {
                id: rows[0].id,
                email: rows[0].email,
                isActivated: rows[0].isActivated
            }
        }
    }

    async logout(refreshToken) {
        await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const connection = await getConnection();

        const [rows] = await connection.execute(`
            SELECT * FROM users
            WHERE email = "${userData.email}"
        `);

        const tokens = tokenService.generateToken({
            id: rows[0].id,
            email: rows[0].email,
            isActivated: rows[0].isActivated
        });
        await tokenService.saveToken(rows[0].email, tokens.refreshToken);

        return {
            ...tokens, user: {
                id: rows[0].id,
                email: rows[0].email,
                isActivated: rows[0].isActivated
            }
        }
    }

    async getBids(email) {
        const connection = await getConnection();

        const [rows] = await connection.execute(`
            SELECT
                bids.rate,
                goods_for_sale.name,
                goods_for_sale.market_price,
                goods_for_sale.picture,
                goods_for_sale.description
            FROM
                bids
            JOIN
                goods_for_sale ON bids.id_goods = goods_for_sale.id
            WHERE
                bids.email = "${email}"
        `);

        return rows
    }

    async getOrders(email) {
        const connection = await getConnection();

        const [rows] = await connection.execute(`
            SELECT
                goods_for_sale.name,
                goods_for_sale.market_price,
                goods_for_sale.picture,
                goods_for_sale.description
            FROM
                purchase_orders
            JOIN
                goods_for_sale ON purchase_orders.name_product = goods_for_sale.name
            WHERE
                purchase_orders.email = "${email}"
        `);

        return rows
    }

    async getEvaluation(email) {
        const connection = await getConnection();

        const [rows] = await connection.execute(`
            SELECT
                requests_for_evaluation.nameProduct,
                requests_for_evaluation.path
            FROM
                requests_for_evaluation
            WHERE
                requests_for_evaluation.email = "${email}"
        `);

        return rows
    }
}

module.exports = new UserService();