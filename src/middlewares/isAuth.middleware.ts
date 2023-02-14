
import User from "../models/user.model";

const auth = (req: any, res: any, next: any) => {
    let { authToken } = req.cookies;

    (User as any).findByToken(authToken, (err: any, user: any) => {
        if (err) throw err;
        if (!user) return res.sendError("403", "Invalid Auth");
        //req.token = authToken
        req.user = user;
        next();
    });
}
//https://articles.wesionary.team/authentication-system-in-nodejs-express-mongodb-rest-apis-4653f8710745
export default auth