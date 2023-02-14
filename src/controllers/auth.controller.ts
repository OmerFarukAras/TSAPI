import User from "../models/user.model";

export const RegisterUser = async (req: any, res: any) => {
    const user = new User(req.body);
    await user.save((err, doc) => {
        if (err) {
            return res.status(422).json({ errors: err })
        } else {
            const userData = {
                firtsName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
            }
            return res.status(200).json(
                {
                    success: true,
                    message: "Successfully Signed Up",
                    userData
                }
            )
        }
    });
}
export const LoginUser = (req: any, res: any) => {
    User.findOne({ "email": req.body.email }, (_err: any, user: any) => {
        if (!user) {
            return res.status(404).json({ success: false, message: "User email not found!" });
        } else {
            user.comparePassword(req.body.password, (_err: any, isMatch: any) => {
                console.log(isMatch);
                if (!isMatch) {
                    return res.status(400).json({ success: false, message: "Wrong Password!" });
                } else {
                    user.generateToken((err: any, user: any) => {
                        if (err) {
                            return res.status(400).send({ err });
                        } else {
                            const data = {
                                userID: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                token: user.token
                            }
                            //saving token to cookie
                            res.cookie("authToken", user.token).status(200).json(
                                {
                                    success: true,
                                    message: "Successfully Logged In!",
                                    userData: data
                                })
                        }
                    });
                }
            });
        }
    });
}
export const LogoutUser = (req: any, res: any) => {
    User.findByIdAndUpdate(
        { _id: req.user._id }
        , { token: "" },
        (err) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).send({ success: true, message: "Successfully Logged Out!" });
        })
}

export const getUserDetails = (req: any, res: any) => {
    return res.status(200).json({
        isAuthenticated: true,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,

    });
};