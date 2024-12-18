var jwt = require('jsonwebtoken');
const JWT_SECRET = "#Swetaisagoodgirl@";

const fetchuser = (req, res, next) => {
    // Get the user from JWT token and add the id request object
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Kindly authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data; // Set req.user directly to the decoded token data
        req.studentId = data.studentId; // This will be used for the update
        next();
    } catch (error) {
        console.error(error.message);
        console.error("JWT_SECRET:", JWT_SECRET);
        return res.status(401).send({ error: "Kindly authenticate using a valid token" });
    }
}

module.exports = fetchuser;

