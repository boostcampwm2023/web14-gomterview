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

export async function saveToRedis(key: string, value: string) {
  try {
    const redis = getRedisInstance();
    await redis.set(key, value);
  } catch (error) {
    throw new HttpException('Redis에 저장 중 오류가 발생하였습니다.', 500);
  }
}

export async function deleteFromRedis(key: string) {
  try {
    const redis = getRedisInstance();
    await redis.del(key);
  } catch (error) {
    throw new HttpException('Redis에서 삭제 중 오류가 발생하였습니다.', 500);
  }
}
