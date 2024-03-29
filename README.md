<div align="center">
    <h1>🌟Remember Me Finance🌟</h1>
</div>

<div align="center">

This project is the academic solution, based in personal necessity when always forgot my expediture.
With this I decided create this solution to insert all expediture and the Web Site remember me when valid date arrive.

</div>

## :rocket: Technology

<div align="center">

```sh
Node Version: v16.13.0
```

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

</div>

## :boom: How to run

- ### **Pre requisites**

  - Make sure you have Node version 16 in your computer.

## :hammer: Application

### Clone the repository:

```sh
# HTTPS
  $ https://github.com/NiltonSousa/remember-me-finance
```

### Create your .env file

```sh
PORT=8000
SQLITE_URL="postgresql://sammy:your_password@localhost:5432/my-blog?schema=public"
SQLITE_URL_TEST="postgresql://sammy:your_password@localhost:5432/my-blog?schema=public"
DATABASE_URL="postgresql://sammy:your_password@localhost:5432/my-blog?schema=public"
```

### Install the dependencies

```sh
  $ npm install
```

### Run docker-compose file

```sh
  $ dc up -d
```

## :hammer: DataBase

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

This project is using prisma to automate database process.

### Run prisma migrations

```sh
$ npx prisma migrate dev
```

### View tables

```sh
$ npx prisma studio
```

### Start the aplication

```sh
  $ npm start
```

## :hammer: Test

### Unit Test

```sh
  $ npm run test:unit
```

### Integration Test

```sh
  $ npm run test:integration
```

## :boom: Routes

POST bill

```sh
curl --location --request POST 'http://localhost:8000/bill' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clientId": "",
    "name":"",
    "value":"",
    "expireDate":"",
    "daysBeforeExpireDateToRemember":""
}'
```

POST notification

```sh
curl --location --request POST 'http://localhost:8000/notification' \
--header 'Content-Type: application/json' \
--data-raw '{
    "billId": "",
    "type":"",
    "message":""
}'
```

POST client

```sh
curl --location --request POST 'http://localhost:8000/client' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "",
        "cpf": "",
        "birthdate": "",
        "email": "",
        "phoneNumber": "",
        "billsCount": "0"
}'
```

POST rating

```sh
curl --location --request POST 'http://localhost:8000/rating' \
--header 'Content-Type: application/json' \
--data-raw '{
        "clientId": "",
        "grade": "",
        "insertedAt": ""
}'
```
