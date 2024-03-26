import {Errback, NextFunction, Request, Response} from "express";

interface ErrorBackCompleted extends Errback {
    statusCode: number;
    message: string;
    stack: string;

}

export default (err: ErrorBackCompleted, req: Request, res: Response, next: NextFunction) => {
    const errorDatas = {
        error: {
            statusCode: err.statusCode || 500,
            message: err.message || "Something went wrong",
        },
        stack: err.stack,
    }

    res.status(errorDatas.error.statusCode).json(errorDatas)
}
