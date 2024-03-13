# E-Commerce_ORM

The back end functionality of an e-commerce website.

![badge](https://img.shields.io/badge/License-MIT-purple)

## Description 

This application serves as the backend functionality for an e-commerce website, accessible at localhost:3001. It provides essential functionalities to support the operation of the e-commerce platform, including handling and managing product inventory, database management and user requests to the server through CRUD routes.


## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributions](#contributions)
  - [Contact](#contact)


## Installation

Open your an intergrated terminal in your chosen code editor and run the following commands:

- Enter your mysql password into the .env file and save
- npm install
- mysql -u root –p
- SOURCE db/schema.sql
- Exit;
- npm run seed (seeds the Database)
- npm run watch (nodemon)

Once complete open up INSOMNIA and create your desired ROUTES.

- GET/Request
- POST/Create
- PUT/Update
- DELETE/Destroy

In the the Categories, Products and Tags endpoints

![Screenshot of INSOMNIA](/Develop/img/Screenshot-01.png)


![Screenshot of INSOMNIA](/Develop/img/Screenshot-02.png)



Please watch the provided video walkthrough link:

- 


## Usage 

This application is an API containing the necessary code to be used for an e-commerce site. Utilizing Express and Sequelize functionality that interacts with a MYSQL2 created Database.

Through this the user is able to make requests to the server, view all items in the database, update an item, delete items/categories or tags.

## License 

Please see the license associated with this repository at:

- https://opensource.org/license/mit/

## Contributions

We welcome future developements and feedback from our users. Please lodge a pull request with any improvements or additions

## Contact

GitHub: 
- https://github.com/eddiespag-hetti/NoteTaker-Express

Email: 
- eddie_p89@hotmail.com