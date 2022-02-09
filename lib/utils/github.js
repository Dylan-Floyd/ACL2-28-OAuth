const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const tokenReq = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const { access_token } = await tokenReq.json();

  return access_token;
};

const getGithubProfile = async (token) => {
  const profileReq = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/json',
      Authorization: `token ${token}`,
    },
  });
  const profile = await profileReq.json();

  return profile;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
