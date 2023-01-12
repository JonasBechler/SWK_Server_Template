// Part of Report 
// ####################################################################################################################

const crypto = require('crypto');

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest()
}

const generateVerifier = () => {
  return base64URLEncode(crypto.randomBytes(32))
}

const generateChallenge = (verifier) => {
  return base64URLEncode(sha256(verifier))
}

// ####################################################################################################################

module.exports = {
  generateVerifier: generateVerifier,
  generateChallenge: generateChallenge
}
