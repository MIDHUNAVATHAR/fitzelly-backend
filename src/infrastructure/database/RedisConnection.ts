import Redis from 'ioredis';


export const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null, // Required by BullMQ
});

export const connectRedis = async () => {
    try {
        await redisConnection.ping();
        console.log("Redis connected successfully");
    } catch (error) {
        console.error("Failed to connect Redis : ", error);
        process.exit(1);
    }
}

redisConnection.on('error', (err) => {
    console.error('Redis runtime error :', err);
});

