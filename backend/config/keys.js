module.exports = {
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret",
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/authDB",
  port: process.env.PORT || 5000
};
