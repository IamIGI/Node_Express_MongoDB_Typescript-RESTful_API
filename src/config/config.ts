import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || ''; //I do not use that
const MONGO_PASSWORD = process.env.MONGO_USERNAME || ''; //I do not use that
const MONGO_URL = process.env.MONGO_URL;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};

export default config;
