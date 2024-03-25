import jsonwebtoken from "jsonwebtoken"
import AppError from "../utils/AppError.js";
import configuration from "../config/configuration.js";

const auth = (req, res, next) => {
    const {
        headers: { authentication: jwt },
    } = req

    try {
        const { payload } = jsonwebtoken.verify(jwt, configuration.security.session.secret)

        req.session = payload
        next()
    } catch (err) {
        console.log(err)
        if (err instanceof jsonwebtoken.TokenExpiredError) {
            throw new AppError(403, "fail", "Token expired")
        }

        if (err instanceof jsonwebtoken.JsonWebTokenError) {
            throw new AppError(403, "fail", "You need to sign in")
        }

        throw new AppError(500, "fail", "Internal server error")
    }
}

export default auth