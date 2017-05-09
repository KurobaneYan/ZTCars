# ZTCars

It's a simple single page application with RESTful Web services. Backend: Node + Express + Mongodb. Frontend: Angular.

## Installation

### Install all dependencies

```shell
$ npm install
```

### Initialize Database

```
$ node initDatabase.js
```

This will create 106 car records in database.

## Run it

1. Install the dependencies 
2. Run Mongo daemon with `mongod`
3. Start the server with `npm start`
4. Then check address [localhost:1337](http://localhost:1337)
5. Or address [localhost:1337/admin](http://localhost:1337/admin)

## REST

### Available requests

| Route | HTTP Verb | Description |
| ----- | ----- | ----- |
| /api/cars | GET | Get all the cars |
| /api/cars/:carId | GET | Get a single car with incrementing views |
| /api/admin/cars | POST | Create a car |
| /api/admin/cars/:carId | GET | Get a single car |
| /api/admin/cars/:carId | PUT | Update a car with a new info |
| /api/admin/cars/:carId | DELETE | Delete a car |
| /api/cars/mostPopular/:amount | GET | Get the most popular cars |
| /api/manufacturers | GET | Get list on a manufacturers |
| /api/models/:manufacturer | GET | Get all car models for a manufacturer |
| /api/search/| POST | Get filtered car query, require filter object |
| /api/search/:string | GET | Search a string in the cars fields |
| /api/search/:string | POST | Search a string in the cars fields, also can use filter object |

### Pagination

| Route | HTTP Verb | Description |
| ----- | ----- | ----- |
| /api/cars?page=[page]&limit=[limit] | GET | Get all the cars with pagination |
| /api/cars/filter?page=[page]&limit=[limit] | POST | Get filtered list of a cars with pagination |
| /api/search/:string?page=[page]&limit[limit] | GET | Find a string in the cars fields with pagination |

### Examples

When creating or updating car send a car fields in body, using JSON format:

```JSON
{
    "carId": 8,
    "fuelType": "Disel",
    "description": "Sell it",
    "model": "Space X",
    "manufacturer": "Mitsubishi",
    "kilometrage": 100,
    "price": 70000,
    "year": 2017,
    "views": 13,
    "automaticTransmission": false,
    "photos": [
      "photo1",
      "photo2",
      "oneMorePhoto"
    ]
}
```

A filter object example:

```JSON
{
    "manufacturer": "Mitsubishi",
    "model": "Lancer",
    "yearMin": 1998,
    "yearMax": 2016,
    "automaticTransmission": false,
    "priceMin": 10000,
    "priceMax": 40000,
    "kilometrageMin": 100,
    "kilometrageMax": 400,
    "fuelType": "Gasoline"
}
```

## Dependencies

| Name | version |
| ------ | ------ |
| Mongodb | 3.4.1 |
| Express | 4.15.2 |
| Angular | 1.6.4 |
| Node js| 6.10.2 |
| Mongoose | 4.9.5 |
| Body-parser | 1.17.1 |
| Morgan | 1.8.1|
| Serve-favicon | 2.4.2 |
| Nodemon | 1.11.0 |
| Webpack | 2.5.0 |

