const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const client = jwksClient({
  strictSsl: true, // Default value
  jwksUri: 'https://idfs-qa.gs.com/ext/oauth/jwks/JwtDefault',
  requestHeaders: {}, // Optional
  requestAgentOptions: {}, // Optional
});


const signedJWT = process.env.access_token;


const kid = 'JwtDefault1';
client.getSigningKey(kid, (err, key) => {
  const signingKey = key.getPublicKey();

  console.log("signing ", signingKey);

  jwt.verify(signedJWT, signingKey, { algorithms: ['RS256'] }, (err, payload) => {
    
    if (err !== null) {
        console.error(err)
    }
    
    
    if (err === null) {
        console.log('Your JWT was successfully validated!');
    }
    
    // Both should be the same
    console.log(payload);
    });
  
});