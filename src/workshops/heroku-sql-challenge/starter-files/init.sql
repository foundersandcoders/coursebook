BEGIN;

DROP TABLE IF EXISTS students, cohorts, projects, students_projects CASCADE;

CREATE TABLE cohorts (
  name VARCHAR(5) PRIMARY KEY,
  location TEXT
);

CREATE TABLE students (
  username TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cohort_name VARCHAR(5) REFERENCES cohorts(name)
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  repo_url TEXT NOT NULL,
  topic TEXT
);

CREATE TABLE students_projects (
  student_username TEXT REFERENCES students(username),
  project_id INTEGER REFERENCES projects(id)
);

INSERT INTO cohorts (name, location) VALUES
  ('7', 'Bethnal Green'),
  ('10', 'Bethnal Green'),
  ('N2', 'Nazareth'),
  ('13', 'Bethnal Green'),
  ('14', 'Finsbury Park'),
  ('15', 'Finsbury Park'),
  ('16', 'Finsbury Park'),
  ('17', 'Finsbury Park')
;

INSERT INTO students (username, name, cohort_name) VALUES
  ('eliascodes', 'Elias', '7'),
  ('oliverjam', 'Oliver', '10'),
  ('yvonne-liu', 'Yvonne', '10'),
  ('matthewdking', 'Matt', 'N2'),
  ('helenzhou6', 'Helen', '13'),
  ('virtualdominic', 'Dom', '14'),
  ('charlielafosse', 'Charlie', '15'),
  ('starsuit', 'Sam', '16'),
  ('bobbysebolao', 'Bobby', '16'),
  ('albadylic', 'Gregor', '17'),
  ('reubengt', 'Reuben', '17')
;

INSERT INTO projects (id, name, topic, repo_url, url) VALUES
  (1, 'FACX Machine', 'HTML &  CSS', 'https://github.com/FAC10/week1-ajoy-facx-machine', 'https://fac10.github.io/week1-ajoy-facx-machine/'),
  (2, 'Hamster Hotel', 'Postgres', 'https://github.com/oliverjam/hamster-hotel', null),
  (3, 'Agony Yaunt', 'API', 'https://github.com/FAC-Sixteen/week-3-agony-yaunt', 'https://fac-sixteen.github.io/week-3-agony-yaunt/public/')
;

INSERT INTO students_projects VALUES
  ('oliverjam', 1),
  ('yvonne-liu', 1),
  ('oliverjam', 2),
  ('starsuit', 2),
  ('starsuit', 3),
  ('bobbysebolao', 3)
;

COMMIT;