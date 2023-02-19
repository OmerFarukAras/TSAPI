import measure from "@/decorator/basicClassLogger"
import { IMailerOptions } from "@/interface/mailer.interface"
import nodemailer from "nodemailer"
import { Logger } from "ng2-logger";
import { IUser } from "@/interface/user.interface";

export class Mailer {
    public mail: nodemailer.Transporter
    public options: IMailerOptions
    public log: Logger
    public active: Boolean
    constructor(options: IMailerOptions, logger: Logger, active: boolean) {
        this.active = active
        this.mail = nodemailer.createTransport(options);
        this.log = logger
        this.options = options
        this.initMail()
    }

    @measure
    initMail(mail = this.mail) {
        if (this.active) mail.sendMail({
            from: '"ElixxRadeS" <info@omerfarukaras.live>',
            to: "omerfarukaras62@gmail.com",
            subject: "Hello",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        })
        return this
    }

    @measure
    sendLoginMail(user: IUser, ip: string | undefined) {
        if (this.active) {
            this.mail.sendMail({
                from: '"ElixxRadeS" <info@omerfarukaras.live>',
                to: user.email,
                subject: "Logged in - " + user.name,
                text: "Logged in - " + user.name + " - " + ip,
            })
            this.log.info("Mail sent to " + user.email)
        }
    }

    @measure
    sendRegisterMail(user: IUser, ip: string | undefined) {
        if (this.active) this.mail.sendMail({
            from: '"ElixxRadeS" <info@omerfarukaras.live>',
            to: user.email,
            subject: "Registered - " + user.name,
            text: "Registered - " + user.name + " - " + ip + " - " + user.password,
        })
    }
}
