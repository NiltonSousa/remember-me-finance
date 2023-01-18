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
SQLITE_URL="file:../db/dev.db"
SQLITE_URL_TEST="file:../db/test.db"
DATABASE_URL="file:../db/test.db"
```

### Install the dependencies

```sh
  $ npm install
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
