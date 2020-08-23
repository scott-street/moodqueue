const { getRedirectStatus } = require('next/dist/lib/check-custom-routes');

module.exports = {
  env: {
    CLIENT_ID: process.env.REACT_APP_MOODQUEUE_CLIENT_ID,
    CLIENT_SECRET: process.env.REACT_APP_MOODQUEUE_CLIENT_SECRET
  }
};
