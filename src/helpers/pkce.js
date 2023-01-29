// Part of Report 
// ####################################################################################################################

const crypto = require('crypto');

// Convert binary string to readable ASCII string for usage in urls (radix-64 representation)
// "+" -> "-"
// "/" -> "_"
// "=" -> ""  because length of string is known
function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")  
    .replace(/\//g, "_") 
    .replace(/=/g, "")    
}

// Create sha256 hash from string
function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest()
}

// Create 32 random bytes in base64 format as verifier
const generateVerifier = () => {
  return base64URLEncode(crypto.randomBytes(32))
}

// Create sha256 hash from verifier in base64 format as challenge 
const generateChallenge = (verifier) => {
  return base64URLEncode(sha256(verifier))
}

// ####################################################################################################################

module.exports = {
  generateVerifier: generateVerifier,
  generateChallenge: generateChallenge
}
