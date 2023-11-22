import Redis from 'ioredis';
import 'dotenv/config';
import { HttpException } from '@nestjs/common';

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
    throw new HttpException('Redis에 저장 중 오류가 발생하였습니다.', 500);
  }
};

export const deleteFromRedis = async (key: string) => {
  try {
    const redis = getRedisInstance();
    await redis.del(key);
  } catch (error) {
    throw new HttpException('Redis에서 삭제 중 오류가 발생하였습니다.', 500);
  }
};

export const getValueFromRedis = async (key: string) => {
  try {
    const redis = getRedisInstance();
    const value = await redis.get(key);
    return value;
  } catch (error) {
    throw new HttpException(
      'Redis에서 정보를 가져오는 중 오류가 발생하였습니다.',
      500,
    );
  }
};
