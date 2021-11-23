import {RateLimiterMemory} from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
    duration: 60,
    points: 20,
})