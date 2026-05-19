import Redis from 'ioredis';
import { logger } from '../logger/logger';

export const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null, // Required by BullMQ
});

export const connectRedis = async () => {
    try {
        await redisConnection.ping();
        logger.info("Redis connected successfully");
    } catch (error) {
        logger.error("Failed to connect Redis : ",{error});
        process.exit(1);
    }
}

redisConnection.on('error', (err) => {
    logger.error('Redis runtime error :', {error:err});
});

