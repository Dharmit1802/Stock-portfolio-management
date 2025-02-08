

## Make sure add this fields to your .env file

```sh
MONGO_URI=""
JWT_SECRET=""
REDIS_URL=""
RAPID_API_YAHOO=""
RAPID_YAHOO_PATH=""
```



## Installation & setUp

initialize your project

```sh
npm init -y
```
Install nodemon to start live server
```sh
npm i nodemon
```
add nodemon script to package.json

```sh
 "start":"nodemon index.js"
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run start
```

#### download redis

- download ubuntu , open terminal and run following command
```sh
sudo apt update && sudo apt install redis-server -y
sudo service redis-server start
redis-cli ping
```
- expected output
```sh
PONG
```

### Test routes with postman


