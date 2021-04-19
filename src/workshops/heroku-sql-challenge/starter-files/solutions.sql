-- 1. Cohort locations
SELECT name FROM cohorts WHERE location = 'Finsbury Park';

-- 2. Student locations
SELECT username FROM students WHERE cohort_name IN (
  SELECT name FROM cohorts WHERE location = 'Finsbury Park'
);

-- 3. Student locations
SELECT students.username, cohorts.location FROM students
  INNER JOIN cohorts ON students.cohort_name = cohorts.name;

-- 4. Students with projects
SELECT projects.name, students.username FROM projects
  INNER JOIN students_projects ON projects.id = students_projects.project_id
  INNER JOIN students ON students.username = students_projects.student_username;

-- 5. Bonus: Students with projects by location
SELECT projects.name, students.username FROM projects
  INNER JOIN students_projects ON projects.id = students_projects.project_id
  INNER JOIN students ON students.username = students_projects.student_username
  WHERE students.username IN (
    SELECT username FROM students
      WHERE cohort_name IN (
        SELECT name FROM cohorts WHERE location = 'Finsbury Park'
      )
  );