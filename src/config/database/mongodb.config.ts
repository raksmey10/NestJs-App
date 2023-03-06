import { registerAs } from '@nestjs/config';

// const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Mongo database connection config
 */
export default registerAs('mongodb', () => {
  const {
    // MONGO_PORT,
    // MONGO_HOSTNAME,
    // MONGO_DATABASE,
    // MONGO_USERNAME,
    // MONGO_PASSWORD,
    MONGODB_URI,
  } = process.env;
  return {
    uri: MONGODB_URI,
    // uri: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
    // uri: isDevelopment
    //   ? `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE}`
    //   : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
  };
});
