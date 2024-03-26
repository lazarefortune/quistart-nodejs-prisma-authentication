import jsonwebtoken, {JwtPayload} from "jsonwebtoken"
import AppError from "../utils/AppError.js";
import configuration from "../config/configuration.ts";
import {NextFunction, Request, Response} from "express";

interface RequestWithSession extends Request {
    session?: JwtPayload;
}

const auth = (req: RequestWithSession, res: Response, next: NextFunction) => {
    try {
        const {
            headers: { authentication: jwt  },
        } = req

        if (!jwt || typeof jwt !== 'string') {
            throw new AppError(403, "fail", "You need to sign in");
        }

        const decoded = jsonwebtoken.verify(jwt, configuration.security.session.secret);

        if (typeof decoded === 'object' && !Array.isArray(decoded)) {
            req.session = decoded as JwtPayload;
            next();
        } else {
            throw new AppError(403, "fail", "Invalid token structure");
        }
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