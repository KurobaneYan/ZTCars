# ZTCars

### Description

It's a simple single page application with RESTful Web services. Backend: Node + Express + Mongodb. Frontend: Angular.

### Installation

```sh
$ npm install
$ bower install
```

### Run it

1. Install the dependencies 
2. Start the server:
    ```shell
    $ npm start
    ```
    or with debug:
    ```
    $ npm run debug
    ```
3. Then check address: `localhost:1337`

### Initialize Database


```
$ node initDatabase.js
```

This will create 106 car records in database.

### REST

| Route | HTTP Verb | Description |
| ----- | ----- | ----- |
| /api/cars | GET | Get all the cars |
| /api/cars | POST | Create a car|
| /api/cars/:carId | GET | Get a single Car |

### Dependencies

| Name | version |
| ------ | ------ |
| Mongodb | 3.4.1 |
| Express | 4.15.2 |
| Angular | 1.6.4 |
| Node js| 6.10.2 |
| Mongoose | 4.9.5 |
| Body-parser | 1.17.1 |
| Debug | 2.6.3 |
| Morgan | 1.8.1|
| Serve-favicon | 2.4.2 |
| Nodemon | 1.11.0 |

