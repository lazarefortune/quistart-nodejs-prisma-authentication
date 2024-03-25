// import dotenv from "dotenv"
// import securityConfig from "security.config.js"
//
// dotenv.config()
// const env = process.env
//
// const configuration = {
//     environment: env.NODE_ENV,
//     port: env.APP_PORT,
//     security: securityConfig,
//     webapp: {
//         origin: env.WEB_APP_ALLOWED_ORIGINS,
//     },
// }
//
// export default configuration

export default {
    environment: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    security: {
        password: {
            pepper: process.env.SECURITY_PASSWORD_PEPPER,
            iteration: 10000,
            keylen: 512,
            digest: "sha512",
        },
        session: {
            secret: process.env.SECURITY_SESSION_SECRET,
            expireAfter: "3 days",
        },
    },
    webapp: {
        origin: process.env.WEB_APP_ALLOWED_ORIGINS,
    },
}