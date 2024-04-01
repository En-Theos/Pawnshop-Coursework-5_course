const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "en.popyk.oleksandr@gmail.com",
                pass: "disc olye njvg kerl"
            }
        })
    }

    async sendActivationMail(toEmail, activatedLink) {
        await this.transporter.sendMail({
            from: "en.popyk.oleksandr@gmail.com",
            to: toEmail,
            subject: "Активація акаунта на сайті Ломбард 'Перспектива'",
            text: '',
            html: `
                <div>
                    <h1>Для активації перейдіть за посиланням</h1>
                    <a href="${activatedLink}">${activatedLink}</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()