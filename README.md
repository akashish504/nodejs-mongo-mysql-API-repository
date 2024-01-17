# Nodejs - MySQL - Mongo API server

This repo contains code for basic API server using express framework and a database. Both sql(MySQL) and no-sql(Mongo) databases are integrated in the service. Docker has been used to containerise the application.

## Steps to start the service.

### Step 1
First we need to start database services. 

#### MongoDB
And we will start mongo db using docker.To do that run the below command.

```bash
docker run --name mongodb -d -p 27017:27017 -v $(pwd)/data:/data/db mongodb/mongodb-community-server
```
Once the container is up and running, open interactive shell in the container using this 
```bash
docker exec -it mongodb bash
```
Once the shell is open mongo shell using.
```bash
mongosh
```
Now once mongo shell is open  create new database using below command.
```bash
use product_info;
```
Now we have a mongo database up and running with desired database created

#### MySQL DB

To start mysql server we will again use docker. Start by running below command.
```bash
docker run -d --name=mysql mysql/mysql-server:latest
```
Now just like above step for mongo db open interactive shell. 
```bash
docker exec -it mysql bash
```
Once the shell is open mysql shell using.
```bash
mysql -u root -p {password}
```
Now once you have logged into the mysql server, you need only need to create new database and our job will be done.

```bash
CREATE DATABASE user_db;
```

### STEP 2

Now we only need to containerise node js application.

For that first we need to build a docker image. For that, once you are in the root folder, run below command.

```bash
docker-compose build
```

Once the image building is complete. Run below command to start the service.

```bash
docker-compose up
```

## Endpoints


1. /createUser
```bash
curl --location 'http://localhost:3000/api/createUser' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test",
    "password": "qwerty123"
}'
```

2. /login
```bash
curl --location 'http://localhost:3000/api/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test1",
    "password": "qwerty123"
}'
```

Once you login into the you will be returned with `jwt` token. Use this token to access other APIs.

3. /addProduct

```bash
curl --location 'http://localhost:3000/api/addNewProduct' \
--header 'jwt token' \
--header 'Content-Type: application/json' \
--data '{
    "productId": "test",
    "name": "treat",
    "brand": "test",
    "listDate": "12 Sep 2023",
    "categories": ["test","test"],
    "inventory": 123,
    "ratings": 3.7,
    "info":"test",
    "price":123
}'
```

4. /listProducts
```bash
curl --location 'http://localhost:3000/api/listAllProducts' \
--header 'jwt token'
```

5. /getProductInfo
```bash
curl --location 'http://localhost:3000/api/getProductInfo?name=treat' \
--header 'jwt token' \
```