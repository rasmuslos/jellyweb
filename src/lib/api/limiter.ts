import {RateLimiterMemory} from "rate-limiter-flexible";

export const limiter = new RateLimiterMemory({
    duration: 60,
    points: 45,
})