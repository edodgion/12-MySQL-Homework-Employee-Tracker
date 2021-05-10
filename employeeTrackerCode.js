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

// const newRole = () => {
//   connection.query("SELECT * FROM role", function (err, res) {
//     if (err) throw err;
//     inquirer
//         .prompt([
//     {
//       name: 'title',
//       type: 'input',
//       message: 'Please add a new Emplyee role.'
//     },
//     {
//       name: 'salary',
//       type: 'input',
//       message: 'Enter desired salary for this role'
//     },
//     {
//       name: 'dept',
//       type: 'list',
//       message: 'Select a department',
//       choices: [
//         'Production',
//         'Purchasing',
//         'Marketing',
//         'Human Resources'
//       ]
//     },
//   ])
//     .then((answer) => {
//       console.log(answer);
//       let deptId = '';
//       switch (answer.dept) {
//         case 'Production':
//           deptId = 1;
//           break;
//         case 'Purchasing':
//           deptId = 2;
//           break;
//         case 'Marketing':
//           deptId = 3;
//           break;
//         default:
//           deptId = 4;
//           break;
//       }
//       const query = connection.query(
//         'INSERT INTO role SET ?',
//         {
//           title: answer.title,
//           salary: answer.salary,
//           department_id: deptId
//         },
//         (err, res) => {
//           if (err) throw err;
//         }
//       )
//       console.log(`${answer.title} role inserted!\n`);
//       runSearch();
//     })
// })
// };


// const newEmployee = () => {
//   connection.query("SELECT * FROM role", function (err, res) {
//     if (err) throw err;
//     inquirer
//         .prompt([{
//                 name: "first_name",
//                 type: "input",
//                 message: "Enter employee's fist name.",
//             },
//             {
//                 name: "last_name",
//                 type: "input",
//                 message: "Enter employee's last name.",
//             },
//             {
//                 name: "role",
//                 type: "list",
//                 choices: function () {
//                     var roleArray = [];
//                     for (let i = 0; i < res.length; i++) {
//                         roleArray.push(res[i].title);
//                     }
//                     return roleArray;
//                 },
//                 message: "What is this employee's role? ",
//             },
//         ])
//         .then(function (answer) {
//             let role_id;
//             for (let a = 0; a < res.length; a++) {
//                 if (res[a].title == answer.role) {
//                     role_id = res[a].id;
//                     console.log(role_id);
//                 }
//             }
//             connection.query(
//                 "INSERT INTO employee SET ?", {
//                     first_name: answer.first_name,
//                     last_name: answer.last_name,
//                     manager_id: answer.manager_id,
//                     role_id: role_id,
//                 },
//                 function (err) {
//                     if (err) throw err;
//                     console.log("Your employee has been added!");
//                     runSearch();
//                 }
//             );
//         });
// });
// };

// const viewDepartment = () => {
//   connection.query(
//     `SELECT deparment.name FROM department ASC`, (err, res) => {
//       if (err) throw err;
//       console.table("All Departments:", res);
//       runSearch();
//   });
// };


// const viewRole = () => {
//   connection.query(
//     `SELECT * role.title, role.salary, role.department_id FROM role ASC`, (err, res) => {
//       if (err) throw err;
//       console.table("All Roles:", res);
//      runSearch();
//   });
// };

// const viewEmployee = () => {
//   connection.query(
//       `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC`,
//       (err, res) => {
//           if (err) throw err;
//           console.table("All Employees", res);
//           runSearch();
//       }
//   );
// };


// const updateEmpRole = () => {
//   prompt([
//     {
//       name: 'first_name',
//       type: 'input',
//       message: 'Please enter the employee\'s first name.\n'
//     },
//     {
//       name: 'last_name',
//       type: 'input',
//       message: 'Please enter the employee\'s last name.\n'
//     },
//     {
//       name: 'role',
//       type: 'list',
//       message: 'Please select the employee\'s new role.',
//       choices: [
//         'General Maintenance Worker',
//         'Purchasing Agent',
//         'HR Assistant',
//         'Purchasing Director',
//         'Social Media Manager',
//         'Warehouse Supervisor',
//    
//       ]
//     },
//   ])
//     .then((answer) => {
//       // find role_id based on role name 
//       let newRoleId = '';
//       switch (answer.role) {
//         case 'Salesman':
//           newRoleId = 1;
//           break;
//         case 'Sales Assistant':
//           newRoleId = 2;
//           break;
//         case 'Software Engineer':
//           newRoleId = 3;
//           break;
//         case 'Electrical Engineer':
//           newRoleId = 4;
//           break;
//         case 'Accountant':
//           newRoleId = 5;
//           break;
//         case 'Collection Agent':
//           newRoleId = 6;
//           break;
//         case 'Lawyer':
//           newRoleId = 7;
//           break;
//         default:
//           newRoleId = 8;
//           break;
//       }
//       console.log(newRoleId);
//       console.log('Updating an employee\'s role');
//       let update = `UPDATE employee SET role_id = ? WHERE employee.first_name = ? AND employee.last_name = ?`
//       // let update = `UPDATE employee SET role_id = ? WHERE employee.id = ?`
//       connection.query(update, [newRoleId, answer.first_name, answer.last_name], (err, res) => {
//         console.log(`Role has been updated.`);
//       })
//       runSearch();
//     })
// };

