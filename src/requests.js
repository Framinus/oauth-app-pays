const { OAUTH_TOKEN } = require('../config');

const hellosign = require('hellosign-sdk')({ oauthToken: OAUTH_TOKEN });

// list all signature requests from this app.
const listSignatureRequests = () => {
  return hellosign.signatureRequest.list()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
};

// send a non-embedded signature request.
const sendSignatureRequest = () => {
  const opts = {
    test_mode: 1,
    title: 'NDA with Acme Co.',
    subject: 'The NDA we talked about',
    message: 'Please sign this NDA and then we can discuss more. Let me know if you have any questions.',
    signers: [
      {
        email_address: 'alice@example.com',
        name: 'Alice',
        order: 0
      },
      {
        email_address: 'bob@example.com',
        name: 'Bob',
        order: 1
      }
    ],
    cc_email_addresses: ['lawyer@example.com'],
    files: ['../fakedoc.pdf']
  };
  return hellosign.signatureRequest.send(opts).then(result => {
    console.log('result', result);
  }).catch(err => {
    console.error(err);
  })
}

module.exports = { listSignatureRequests, sendSignatureRequest };
