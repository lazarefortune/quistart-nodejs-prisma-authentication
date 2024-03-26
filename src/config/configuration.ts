import securityConfig from "./security.config.js";

const configuration = {
    environment: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    security: securityConfig,
    webapp: {
        origin: process.env.WEB_APP_ALLOWED_ORIGINS,
    },
}

export default configuration