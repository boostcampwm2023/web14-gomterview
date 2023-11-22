import Redis from 'ioredis';
import 'dotenv/config';

let redisInstance: Redis;

function getRedisInstance() {
  if (!redisInstance) {
    const redisUrl: string = process.env.REDIS_URL as string;
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not defined.');
    }
    redisInstance = new Redis(redisUrl);
  }
  return redisInstance;
}

export async function saveToRedis(key: string, value: string) {
  const redis = getRedisInstance();
  await redis.set(key, value);
}

export async function deleteFromRedis(key: string) {
  const redis = getRedisInstance();
  await redis.del(key);
}
