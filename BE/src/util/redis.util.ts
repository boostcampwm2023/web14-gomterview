import Redis from 'ioredis';
import 'dotenv/config';
import {
  RedisDeleteException,
  RedisRetrieveException,
  RedisSaveException,
} from 'src/video/exception/video.exception';
import redisMock from 'ioredis-mock';

const getNewRedis = () => {
  return process.env.IS_PROD === 'true'
    ? new Redis(process.env.REDIS_URL as string)
    : new redisMock();
};

export const saveToRedis = async (
  key: string,
  value: string,
  redis: Redis = getNewRedis(),
) => {
  try {
    const transaction = redis.multi();
    transaction.set(key, value);
    await transaction.exec();
  } catch (error) {
    throw new RedisSaveException();
  } finally {
    await redis.quit();
  }
};

export const saveToRedisWithExpireIn = async (
  key: string,
  value: string,
  ttl: number,
  redis = getNewRedis(),
) => {
  try {
    await redis.set(key, value, 'EX', ttl);
  } catch (error) {
    throw new RedisSaveException();
  } finally {
    await redis.quit();
  }
};

export const deleteFromRedis = async (
  key: string,
  redis: Redis = getNewRedis(),
) => {
  try {
    const transaction = redis.multi();
    transaction.del(key);
    await transaction.exec();
  } catch (error) {
    throw new RedisDeleteException();
  } finally {
    await redis.quit();
  }
};

export const getValueFromRedis = async (
  key: string,
  redis: Redis = getNewRedis(),
) => {
  try {
    const value = await redis.get(key);
    return value;
  } catch (error) {
    throw new RedisRetrieveException();
  } finally {
    await redis.quit();
  }
};

export const clearRedis = async (redis: Redis) => {
  try {
    await redis.flushdb();
  } catch (error) {
    throw new Error('Redis 초기화 실패');
  } finally {
    await redis.quit();
  }
};
