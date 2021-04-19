---
title: Remote database challenge
description: Practice deploying a PostgreSQL database to Heroku, plus some advanced SQL commands.
tags:
  - workshop
  - sql
keywords:
  - sql
  - heroku
---

You don't want your deployed production app talking to a database running on your laptop. This would be slow, insecure and require you to leave it turned on all the time.

Instead we can host our production database on a 3rd party service like Heroku. This is especially convenient if we're already hosting our production server on Heroku.

Follow these [instructions for setting up a free Heroku database](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1).

Once you're done you should have a connection string that looks something like this:

```shell
postgres://okaws:d3fa@ec2-54.eu-west-1.compute.amazonaws.com:5432/d8bvo
```

You can connect to the remote database from your terminal by running:

```shell
psql your_url_goes_here
```

## Advanced SQL

Let's practice some more advanced SQL commands. There's a bunch of data about various FAC cohorts in `init.sql`. You'll need to read this to figure out exactly what tables you're working with.

You may have to search the internet for SQL you haven't seen before. [W3 Schools](https://www.w3schools.com/sql/) is a good resource.

There's usually more than one way to get the right answer. If your solution is different that's fine!

### Setup

1. Download the starter files
1. Connect to your Heroku database with `psql your_database_url`
1. Insert the data into your DB with `\i init.sql`

You can check everything is set up by listing the database tables with `\dt`. You should see four FAC-related tables: `cohorts`, `students`, `projects` and `students_projects`.

1.  ### Cohort locations

    List the names of all cohorts that took place in Finsbury Park.

    #### Expected result

    | name |
    | ---- |
    | 14   |
    | 15   |
    | 16   |
    | 17   |

    {% disclosure %}

    ```sql
    SELECT name FROM cohorts WHERE location = 'Finsbury Park';
    ```

    {% enddisclosure %}

1.  ### Student locations

    List the usernames of all students who attended FAC in Finsbury Park.

    {% disclosure "Reveal hint" "default" %}

    You need to use the query from the previous question.

    {% enddisclosure %}

    #### Expected result

    | username       |
    | -------------- |
    | virtualdominic |
    | charlielafosse |
    | starsuit       |
    | bobbysebolao   |
    | albadylic      |
    | reubengt       |

    {% disclosure %}

    ```sql
    SELECT username FROM students WHERE cohort_name IN (
      SELECT name FROM cohorts WHERE location = 'Finsbury Park'
    );
    ```

    {% enddisclosure %}

1.  ### Student locations

    List the username of each student along with the location of their cohort.

    {% disclosure "Reveal hint" "default" %}

    Remember you can use joins to connect two tables together and access information from both.

    {% enddisclosure %}

    #### Expected result

    | username       | location      |
    | -------------- | ------------- |
    | eliascodes     | Bethnal Green |
    | oliverjam      | Bethnal Green |
    | yvonne-liu     | Bethnal Green |
    | matthewdking   | Nazareth      |
    | helenzhou6     | Bethnal Green |
    | virtualdominic | Finsbury Park |
    | charlielafosse | Finsbury Park |
    | starsuit       | Finsbury Park |
    | bobbysebolao   | Finsbury Park |
    | albadylic      | Finsbury Park |
    | reubengt       | Finsbury Park |

    {% disclosure %}

    ```sql
    SELECT students.username, cohorts.location FROM students
      INNER JOIN cohorts ON students.cohort_name = cohorts.name;
    ```

    {% enddisclosure %}

1.  ### Students with projects

    List all project names with the usernames of the students who worked on them.

    {% disclosure "Reveal hint" "default" %}

    Since projects-to-students is a _many-to-many_ relationship (each project can have multiple authors, each student can have multiple projects) we can't link them with just IDs. We need to use a separate table to keep track of which students worked on which projects.

    This is often called a _join table_, or _junction table_. You'll need to join to this as an intermediary step to link projects to students. You don't need to create it—it is already created in `init.sql`

    {% enddisclosure %}

    #### Expected result

    | name          | username     |
    | ------------- | ------------ |
    | FACX Machine  | oliverjam    |
    | FACX Machine  | yvonne-liu   |
    | Hamster Hotel | oliverjam    |
    | Hamster Hotel | starsuit     |
    | Agony Yaunt   | starsuit     |
    | Agony Yaunt   | bobbysebolao |

    {% disclosure %}

    ```sql
    SELECT projects.name, students.username FROM projects
      INNER JOIN students_projects ON projects.id = students_projects.project_id
      INNER JOIN students ON students.username = students_projects.student_username;
    ```

    {% enddisclosure %}

1.  ### Bonus: Students with projects by location

    List all project names with the usernames of the students who worked on them, only for students who attended FAC in Finsbury Park.

    {% disclosure "Reveal hint" "default" %}

    You've written all the queries you need in previous steps.

    {% enddisclosure %}

    #### Expected result

    | name          | username     |
    | ------------- | ------------ |
    | Hamster Hotel | starsuit     |
    | Agony Yaunt   | starsuit     |
    | Agony Yaunt   | bobbysebolao |

    {% disclosure %}

    ```sql
    SELECT projects.name, students.username FROM projects
      INNER JOIN students_projects ON projects.id = students_projects.project_id
      INNER JOIN students ON students.username = students_projects.student_username
      WHERE students.username IN (
        SELECT username FROM students
          WHERE cohort_name IN (
            SELECT name FROM cohorts WHERE location = 'Finsbury Park'
          )
      );
    ```

    {% enddisclosure %}
