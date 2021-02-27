# Gateway
## Installation guides
### Dependencies

First step: install node modules
```
npm install
```

### Database
#### Connection
This project was developed using MongoDB. To configure the connection create a '.env' file, on the project's root directory, with a connection string as it shows in the next example: 
```
MONGODB_URI = mongodb://localhost/gateway
```

#### Test data
In the db_data folder, located on the project's root directory, are two files you will need to import to the database to successfully run the implemented test.

### Run
#### Test
To run the implemented tests execute:
```
npm run dev
```

#### Run app
To run the app execute:
```
npm run start
```