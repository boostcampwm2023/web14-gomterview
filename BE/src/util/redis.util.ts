import Redis from 'ioredis';
import 'dotenv/config';
import {
  RedisDeleteException,
  RedisRetrieveException,
  RedisSaveException,
} from 'src/video/exception/video.exception';

let redisInstance: Redis;

function getRedisInstance() {
  if (redisInstance) return redisInstance;

  const redisUrl: string = process.env.REDIS_URL as string;
  if (redisUrl) {
    redisInstance = new Redis(redisUrl);
    return redisInstance;
  }

  throw new Error('REDIS_URL 환경 변수가 설정되지 않았습니다.');
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
