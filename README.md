
## Node Coding Challenge - Contact API

### Setup environment

- Cloning the repository

```bash
git clone https://github.com/chintalra/capital-one-contact-api.git
cd capital-one-contact-api
```
- For installing dependencies

```bash
npm install
```

- Database configuration (MongoDB)
```bash
#set environment variable called MONGO_URL with mongodb connection uri
export MONGO_URL='YOUR MONGODB Cluster URI'
# if you want to use your local mongodb then simply ignore this part
```

- Now run the server with
```bash
npm start 
# OR
npm run dev # for the development environment
```

- To run tests
```bash
npm run test
# we have used jest for unit testing
```


### Available Routes - 
- http://localhost:3000/contacts **GET** 
  
- http://localhost:3000/contacts **POST** 

- http://localhost:3000/contacts/{id} **GET, PUT, DELETE**
