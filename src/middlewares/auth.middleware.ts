import User from "../models/user.model";

const auth = (req: any, res: any, next: any) => {
    let token = req.cookies.authToken;

    (User as any).findByToken(token, (err: any, user: any) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        req.token = token
        req.user = user;
        next();
    });
}
//https://articles.wesionary.team/authentication-system-in-nodejs-express-mongodb-rest-apis-4653f8710745
export default auth