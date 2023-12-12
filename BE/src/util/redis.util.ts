import Redis from 'ioredis';
import 'dotenv/config';
import {
  RedisDeleteException,
  RedisRetrieveException,
  RedisSaveException,
} from 'src/video/exception/video.exception';

export const saveToRedis = async (key: string, value: string) => {
  const redis = new Redis(process.env.REDIS_URL as string);
  try {
    await redis.watch(key);
    const transaction = redis.multi();
    transaction.set(key, value);
    await transaction.exec();
  } catch (error) {
    throw new RedisSaveException();
  } finally {
    await redis.quit();
  }
};

export const deleteFromRedis = async (key: string) => {
  const redis = new Redis(process.env.REDIS_URL as string);
  try {
    await redis.watch(key);
    const transaction = redis.multi();
    transaction.del(key);
    await transaction.exec();
  } catch (error) {
    throw new RedisDeleteException();
  } finally {
    await redis.quit();
  }
};

export const getValueFromRedis = async (key: string) => {
  const redis = new Redis(process.env.REDIS_URL as string);
  try {
    const value = await redis.get(key);
    return value;
  } catch (error) {
    throw new RedisRetrieveException();
  } finally {
    await redis.quit();
  }
};
