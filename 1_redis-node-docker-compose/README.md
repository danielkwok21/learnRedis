# Redis + node + docker-compose


## Getting started
1. Start server
```bash
# Install dependencies
npm i

# Run server
docker-compose up
```

2. Observe `Client ready` at terminal. This is from redis.
```bash
my-node-app_1   | [nodemon] 2.0.19
my-node-app_1   | [nodemon] to restart at any time, enter `rs`
my-node-app_1   | [nodemon] watching path(s): *.*
my-node-app_1   | [nodemon] watching extensions: js,mjs,json
my-node-app_1   | [nodemon] starting `node index.js`
my-node-app_1   | Client ready
```

## Hard lessons
These 3 names **MUST** align. We use environment variables in this example, but any means works.

Else will have the error in terminal:
```bash
my-node-app_1  | Client error
my-node-app_1  | Error: getaddrinfo EAI_AGAIN my_really_awesome_redis
my-node-app_1  |     at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:109:26) {
my-node-app_1  |   errno: -3001,
my-node-app_1  |   code: 'EAI_AGAIN',
my-node-app_1  |   syscall: 'getaddrinfo',
my-node-app_1  |   hostname: 'my_really_awesome_redis'
my-node-app_1  | }
```

1. Service's name at [./docker-compose.yml](./docker-compose.yml)
```yml
version: '2'

services:
  # This name "my_really_awesome_redis"... 
  my_really_awesome_redis:
    image: redis:6.2-alpine
```

1. `url` param for `createClient()` at [./index.js](./index.js)
```javascript
const { createClient } = require('redis')

/**
 * ...must match the URL here as such
 * redis://${redis-service-name}:6379
 * 
 */
const client = createClient({
    url: `redis://my_really_awesome_redis:6379`
})

```