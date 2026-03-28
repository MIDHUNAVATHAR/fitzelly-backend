import Redis from 'ioredis';

export const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null, // Required by BullMQ
});

redisConnection.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redisConnection.on('connect', () => {
    console.log('Redis connected successfully');
});
