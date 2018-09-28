const { API_KEY, CLIENT_ID, CLIENT_SECRET } = require('../config.js');

const hellosign = require('hellosign-sdk')({ key: API_KEY, client_id: CLIENT_ID, client_secret: CLIENT_SECRET });

// verifies whether a new user of the app already has a hellosign account.
// Only necessary if you don't know whether or not they do.
const verifyAccount = (email) => {
  return hellosign.account.verify({ email_address: email })
    .then((res) => {
      console.log('response', res);
    })
    .catch((err) => {
      console.error(err);
    })
};

// uses the state and code from the auth link to get the token you need to make api calls.
const getToken = (state, code) => {
  return hellosign.oauth.getToken({
    state, code
  })
  .then((res) => {
    console.log('oauth token: ', res);
  })
  .catch((err) => {
    console.error(err);
  })
};

console.log(getToken('b380aa09', '5f801019368f64a6'));

const refreshAuthToken = () => {
  return hellosign.oauth.refreshToken({
    grant_type: 'refresh_token',
    refresh_token: '123456'
  })
  .then((response) => {
    console.log('response', response);
  })
  .catch((err) => {
    console.error(err);
  })
};
