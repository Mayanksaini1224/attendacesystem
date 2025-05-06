const crypto = require('crypto');
require('dotenv').config();

// Encryption function
function encryptMongoURI(mongoUri) {
  const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Convert hex to Buffer (32 bytes)
  const algorithm = 'aes-256-cbc';
  const iv = crypto.randomBytes(16); // Generate a random initialization vector

  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
  let encrypted = cipher.update(mongoUri, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return the encrypted URI and IV as a hexadecimal string
  return {
    encryptedUri: encrypted,
    iv: iv.toString('hex'),
  };
}

// Decryption function
function decryptMongoURI(encryptedUri, ivHex) {
  const encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Convert hex to Buffer (32 bytes)
  const iv = Buffer.from(ivHex, 'hex'); // Convert the IV from hex to a buffer
  const algorithm = 'aes-256-cbc';

  const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
  let decrypted = decipher.update(encryptedUri, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Example usage: Encrypt and decrypt a MongoDB URI
const mongoUri = 'enter your URL';

// Encrypt the MongoDB URI
const encryptedData = encryptMongoURI(mongoUri);
console.log('Encrypted Mongo URI:', encryptedData.encryptedUri);
console.log('Initialization Vector:', encryptedData.iv);

// Decrypt the MongoDB URI using the encrypted data and IV
const decryptedUri = decryptMongoURI(encryptedData.encryptedUri, encryptedData.iv);
console.log('Decrypted Mongo URI:', decryptedUri);

module.exports = { encryptMongoURI, decryptMongoURI };
