// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    const errorDatas = {
        error: {
            statusCode: err.statusCode || 500,
            message: err.message || "Something went wrong",
        },
    }

    errorDatas.error = { ...errorDatas.error, stack: err.stack }

    res.status(errorDatas.error.statusCode).json(errorDatas)
}
