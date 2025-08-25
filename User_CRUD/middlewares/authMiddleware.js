const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const user_token = authHeader.split(' ')[1];

    if (!user_token) {
        return res.status(400).json('Login is required');
    }
    try {
        const decoded = jwt.verify(user_token, 'hemansi123');
        req.user = decoded;
        console.log(req.user,"oo")
        // console.log(data,"tokk")
        next();
    } catch (error) {
        return res.status(400).json({ error: 'Invalid or expired token', message: error.message });
    }
}