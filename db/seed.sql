USE employee_db;

INSERT INTO department
  (name)
VALUES
  ("Production"),
  ("Purchasing"),
  ("Marketing"),
  ("Human Resources");

INSERT INTO role
  (title, salary, department_id)
VALUES
  ("General Maintenance Worker", 65000.88, 1),
  ("Purchasing Agent", 75000.53, 2),
  ("HR Assistant", 32000.45, 4),
  ("Purchasing Director", 85000.89, 2),
  ("Social Media Manager", 65000.45, 3),
  ("Warehouse Supervisor", 52000.65, 1);
  


INSERT INTO employee
  (last_name, first_name, role_id)
VALUES
  ("Gein", "Ed", 1),
  ("Bundy", "Ted", 2),
  ("Wuornos", "Aileen", 3),
  ("Gacy", "John Wayne", 4),
  ("Dahmer", "Jeffery", 5),
  ("Puente", "Dorothea", 6),
  ("Manson", "Charlie", 7),
  ("Pender", "Sarah Jo", 8),
  ("Bundy", "Carol", 9),
  ("Ramirez", "Richard", 10);
