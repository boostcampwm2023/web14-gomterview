import Redis from 'ioredis';
import 'dotenv/config';

let redisInstance: Redis;

export function getRedisInstance() {
  if (!redisInstance) {
    const redisUrl: string = process.env.REDIS_URL as string;
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not defined.');
    }
    redisInstance = new Redis(redisUrl);
  }
  return redisInstance;
}
