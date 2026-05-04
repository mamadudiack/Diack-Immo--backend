
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le token et autoriser admin uniquement
const authorizeAdmin = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401).json({
      message: "Access denied. No token provided"
    });
  }

  // Format attendu: Bearer TOKEN
  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Invalid token format"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admins only"
      });
    }

    req.user = decoded;
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authorizeAdmin;