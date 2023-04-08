import { load } from 'ts-dotenv';

const env = load({
	JWT_SECRET: String,
	JWT_EXPIRES_IN: String,
	RABBITMQ_CONNECTION: String,
	MONGO_CONNECTION_URL: String,
});

export default env;
