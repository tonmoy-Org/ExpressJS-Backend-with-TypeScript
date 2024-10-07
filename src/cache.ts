import Redis from 'ioredis';

const redisClient = new Redis();


redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Redis is connected successfully
redisClient.on('connect', () => {
  console.log('Connected to Redis successfully!');
});


// cache with JSON support and error handling
export const setCache = async (key: string, value: any, duration: number): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value);
    await redisClient.set(key, stringValue, 'EX', duration); // EX sets the expiration time in seconds
  } catch (err) {
    console.error(`Failed to set cache for key: ${key}`, err);
  }
};

// get cached value with error handling and JSON parsing
export const getCache = async (key: string): Promise<any | null> => {
  try {
    const cachedValue = await redisClient.get(key);
    return cachedValue ? JSON.parse(cachedValue) : null;
  } catch (err) {
    console.error(`Failed to get cache for key: ${key}`, err);
    return null;
  }
};

export default redisClient;
