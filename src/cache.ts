import Redis from 'ioredis';

const redisClient = new Redis(); // defaults to localhost:6379

export const setCache = async (key: string, value: string, duration: number) => {
  await redisClient.set(key, value, 'EX', duration);
};

export const getCache = async (key: string) => {
  return await redisClient.get(key);
};

export default redisClient;
