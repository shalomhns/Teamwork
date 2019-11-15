const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();



//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get('/', (request, response) => {
    response.json({ info: 'Teamwork API' })
  });



app.get('/api/v1/users', db.getUsers);

app.get('/api/v1/users/:id', db.getUserById);

app.post('/api/v1/users', db.createUser);

app.put('/api/v1/users/:id', db.updateUser);

app.delete('/api/vi/users/:id', db.deleteUser);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  });

 