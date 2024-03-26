const userService = require("./service/user.service");

const Router = require("express").Router;

const router = new Router();

router.post("/registration", async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userData = await userService.registration(email, password)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        return res.json(userData)
    } catch (err) {
        console.log(err)
    }
});
router.post("/login");
router.post("/logout");
router.get("/activate/:link");
router.get("/refresh");
router.get("/users");

module.exports = router;