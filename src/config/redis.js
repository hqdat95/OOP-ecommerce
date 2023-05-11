import Redis from 'ioredis';
import Logger from './winston';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
  password: process.env.REDIS_PASSWORD,
});

redis.on('ready', () => {
  Logger.log('info', 'Server is connection to Redis', 200);
});

redis.on('error', (err) => {
  Logger.log('error', 'Error connecting to Redis:', err);
});

export default redis;
