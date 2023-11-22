import Redis from 'ioredis';
import 'dotenv/config';
import {
  RedisDeleteException,
  RedisRetrieveException,
  RedisSaveException,
} from 'src/video/exception/video.exception';

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

export const saveToRedis = async (key: string, value: string) => {
  try {
    const redis = getRedisInstance();
    await redis.set(key, value);
  } catch (error) {
    throw new RedisSaveException();
  }
};

export const deleteFromRedis = async (key: string) => {
  try {
    const redis = getRedisInstance();
    await redis.del(key);
  } catch (error) {
    throw new RedisDeleteException();
  }
};

export const getValueFromRedis = async (key: string) => {
  try {
    const redis = getRedisInstance();
    const value = await redis.get(key);
    return value;
  } catch (error) {
    throw new RedisRetrieveException();
  }
};
