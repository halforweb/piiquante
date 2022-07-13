//* import ratelimit 
const rateLimit = require('express-rate-limit')

//* define the apilimiter middleware
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, //* timeframe of 15 minutes on which requests are checked
	max: 100, //* Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: 'You have exceeded the max requests !',
	standardHeaders: true, //* Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, //* Disable the `X-RateLimit-*` headers
})

//* export the middleware
module.exports = apiLimiter;