// connecting to Database

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'shalom',
  host: 'localhost',
  database: 'api',
  password: 'skylimit',
  port: 5432,
});


pool.on('connect', () => {
  console.log('connected to the db');
});

//creating routes

//get all users

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    });
}
// Get Single User by Id

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    });
  }
   //Post a new User

   const createUser = (request, response) => {
    const { firstName, lastName, Email, Password, Gender, Jobrole, Department, Address } = request.body
  
    pool.query('INSERT INTO users (firstName, lastName, Email, Password, Gender, Jobrole, Department, Address) VALUES ($1, $2, ...)', [firstName, lastName, Email, Password, Gender, Jobrole, Department, Address], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Users added with ID: ${results.insertId}`)
    });
  }

  //Update Data in an Existing User

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { firstName, lastName, Email, Password, Gender, Jobrole, Department, Address } = request.body
  
    pool.query(
      'UPDATE user SET firstName = $1, lastName =$2, Email = $3, Password = $4, Gender = $5, Jobrole = $6, Department = $7, Address = $8 WHERE id = $9',
      [firstName, lastName, Email, Password, Gender, Jobrole, Department, Address, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    );
  }

  // Delete a user

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Users deleted with ID: ${id}`)
    });
  }

  //Export

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }