// backend/config/index.js
module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN
    },
    aws: {
      NAME_OF_BUCKET: process.env.AWS_BUCKET_NAME
    },
    googleMapsAPIKey: process.env.MAPS_API_KEY,
  };
