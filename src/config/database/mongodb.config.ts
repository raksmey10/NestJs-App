import { registerAs } from '@nestjs/config';

/**
 * Mongo database connection config
 */
export default registerAs('mongodb', () => {
	// const isDevelopment = process.env.NODE_ENV === 'development';
	const {
		// MONGO_PORT,
		MONGO_HOSTNAME,
		MONGO_DATABASE,
		MONGO_USERNAME,
		MONGO_PASSWORD
	} = process.env;
	return {
		uri: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`
	};
	// return {
	// 	uri: isDevelopment
	// 		? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`
	// 		: `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DATABASE}`
	// };
});
