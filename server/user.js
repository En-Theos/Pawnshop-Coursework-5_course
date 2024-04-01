const userService = require("./service/user.service");
const authMiddleware = require('./middleware/auth.middleware')

const Router = require("express").Router;

const router = new Router();

router.post("/registration", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await userService.registration(email, password)
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

        return res.json(userData)
    } catch (err) {
        next(err)
    }
});
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userData = await userService.login(email, password)

        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json(userData)
    } catch (err) {
        next(err)
    }
});
router.post("/logout", async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        await userService.logout(refreshToken);

        res.clearCookie('refreshToken')

        res.json({
            massage: "Успішно розлогінено"
        })
    } catch (err) {
        next(err)
    }
});
router.get("/activate/:link", async (req, res, next) => {
    try {
        const activationLink = req.params.link;
        await userService.activate(activationLink);
        res.redirect("http://localhost:3000/ ")
    } catch (err) {
        next(err)
    }
});
router.get("/refresh", async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        const userData = await userService.refresh(refreshToken)

        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.json(userData)
    } catch (err) {
        next(err)
    }
});
router.get("/userBids", authMiddleware, async (req, res, next) => {
    try {
        const { email } = req.body;

        const bids = await userService.getBids(email);

        return res.json(bids)
    } catch (err) {
        next(err)
    }
});
router.get("/userOrders", authMiddleware, async (req, res, next) => {
    try {
        const { email } = req.body;

        const orders = await userService.getOrders(email);

        return res.json(orders)
    } catch (err) {
        next(err)
    }
});
router.get("/userEvaluation", authMiddleware, async (req, res, next) => {
    try {
        const { email } = req.body;

        const evaluation = await userService.getEvaluation(email);

        return res.json(evaluation)
    } catch (err) {
        next(err)
    }
});

module.exports = router;