const inquirer = require("inquirer");
require("console.table");

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Be sure to update with your own MySQL password!
  password: "",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Deparment",
        "Add Role",
        "Add Employee",
        "View Deparment",
        "View Role",
        "View Employee",
        "Update Role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add Deparment":
          newDepartment();
          break;
        case "Add Role":
          newRole();
          break;
        case "Add Employee":
          newEmployee();
          break;
        case "View Deparment":
          viewDepartment();
          break;
        case "View Role":
          viewRole();
          break;
        case "View Employee":
          viewEmployee();
        case "Update Role":
          updateRole();
          break;
        case "Exit":
          connection.end();
          console.log("You have exited the prompt");
          break;
        default:
          console.log("Invalid entry");
      }
    });
};

const newDepartment = () => {
  console.log("Please add a new department...");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "Please enter new Department",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.department,
          },
          function (err) {
            if (err) throw err;
            console.table("Add Department", res);
            runSearch();
          }
        );
      });
  });
};

const newRole = () => {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Please add a new Emplyee role.",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter desired salary for this role",
        },
        {
          name: "department",
          type: "list",
          message: "Select a department",
          choices: ["Production", "Purchasing", "Marketing", "Human Resources"],
        },
      ])
      .then((answer) => {
        console.log(answer);
        let deptId = "";
        switch (answer.department) {
          case "Production":
            deptId = 1;
            break;
          case "Purchasing":
            deptId = 2;
            break;
          case "Marketing":
            deptId = 3;
            break;
          default:
            deptId = 4;
            break;
        }
        const query = connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: deptId,
          },
          (err, res) => {
            if (err) throw err;
          }
        );
        console.log(`${answer.title} role inserted!`);
        runSearch();
      });
  });
};
const newEmployee = () => {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter employees fist name.",
        },
        {
          name: "last_name",
          type: "input",
          message: "Enter employees last name.",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employees role?",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log("New Employee was added");
            runSearch();
          }
        );
      });
  });
};
const viewDepartment = () => {
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table("All Departments:", res);
    runSearch();
  });
};
const viewRole = () => {
  connection.query(
    `SELECT role.title, role.salary, role.department_id FROM role `,
    (err, res) => {
      if (err) throw err;
      console.table("All Roles:", res);
      runSearch();
    }
  );
};
const viewEmployee = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id ORDER BY employee.id ASC`,
    (err, res) => {
      if (err) throw err;
      console.table("All Employees", res);
      runSearch();
    }
  );
};
const updateRole = () => {
	connection.query(
		`SELECT id, title FROM role`,
		(err, res) => {
			if (err) throw err;
      var roleTitles = [];
      for (var i = 0; i < res.length; i++){
        roleTitles.push(res[i].title + " " + res[i].id )
      }



      inquirer
      .prompt([
        {
          name: "newRole",
          type: "list",
          message: "Please select new role",
          choices: roleTitles
        },
      ])
      .then(function (answer) {
        var names = [];
        connection.query(
          `SELECT id, first_name, last_name FROM employee`,
          function (err,res) {
            if (err) throw err;
     
      for (var i = 0; i < res.length; i++){
        names.push(res[i].first_name + " " + res[i].last_name + " " + res[i].id )
          }

          inquirer
        .prompt([
          {
            name: "employeeName",
            type: "list",
            message: "Please select employee",
            choices: names
          },
        ])
        });
        

      });
		}
	);
	connection.query(
		`UPDATE id, role.title SET role WHERE id`,
		(err, res) => {
			if (err) throw err;
			console.table("All Roles", res);
      runSearch();
		}
	)
};

