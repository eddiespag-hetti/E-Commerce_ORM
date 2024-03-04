require('dotenv').config();

// Imports sequelize 
const Sequelize = require('sequelize');


// Creates a instance of Sequelize
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });



  // Exports sequlize to be used else where  
module.exports = sequelize;

