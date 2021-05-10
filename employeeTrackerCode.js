const inquirer = require('inquirer');
require('console.table');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Mysqlpass1234!',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add Deparment',
        'Add Role',
        'Add Employee',
        'View Deparment',
        'View Role',
        'View Employee',
        'Update Deparment',
        'Update Employee',
        'Update Role'
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add Department':
          newDepartment();
          break;

        case 'Add the Role':
          newRole();
          break;

          case 'Add the Employee':
            newEmployee();
            break;

        case 'View Employee by Deparmtent':
          viewDepartment();
          break;

        case 'View Employee by Role':
          viewRole();
          break;

          case 'View Employee':
          viewEmployee();
          break;

        default:
         console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const newDepartment = () => {
  console.log('Please add a new department...\n')
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer
        .prompt([{
            name: "department",
            type: "input",
            message: "Would you like to add a department? ",
        }, ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?", {
                    name: answer.department,
                },
                function (err) {
                    if (err) throw err;
      console.table('Create a Department', res);
      runSearch();
    });
  });
});
};

