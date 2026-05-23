const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: (payload) => {
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
        return token;
    },
    verifyToken: (token) => {
        const secretKey = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (err) {
            return null;
        }
    }
}