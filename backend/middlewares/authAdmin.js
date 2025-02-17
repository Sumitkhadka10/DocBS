const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers.authorization?.split(" ")[1]; // Ensure correct token extraction

    if (!atoken) {
      return res.status(401).json({ success: false, message: "Unauthorized: No Token Provided" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET); // Verify token using secret key

    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Forbidden: Invalid Token" });
    }

    req.admin = token_decode; // Attach decoded token info to request
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Token verification failed", error: error.message });
  }
};

module.exports = authAdmin;
