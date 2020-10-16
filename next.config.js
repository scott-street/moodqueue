const { getRedirectStatus } = require("next/dist/lib/check-custom-routes")

module.exports = {
    env: {
        CLIENT_ID: process.env.REACT_APP_MOODQUEUE_CLIENT_ID,
        CLIENT_SECRET: process.env.REACT_APP_MOODQUEUE_CLIENT_SECRET,
        DEVELOPMENT_URL: process.env.REACT_APP_DEVELOPMENT,
        REVIEW_URL: process.env.REACT_APP_REVIEW,
        STAGING_URL: process.env.REACT_APP_STAGING,
        PRODUCTION_URL: process.env.REACT_APP_PRODUCTION,
        PORT: process.env.PORT,
    },
}
