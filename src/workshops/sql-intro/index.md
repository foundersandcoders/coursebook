---
title: SQL Introduction
description: Learn the fundamentals of using SQL to query a database
tags:
  - workshop
  - sql
keywords:
  - sql
  - databases
---

In this workshop we will be learning SQL by running commands in our terminal.

## Getting Started

Make sure you have [installed and set up PostgreSQL](https://github.com/macintoshhelper/learn-sql/blob/master/postgresql/setup.md).

We'll be using `psql`, the Postgres command-line interface. This lets you run SQL queries and also provides some extra commands for working with the database. These extras start with a backslash character (e.g. `\c`) whereas SQL is usually uppercase (e.g. `CREATE DATABASE`).

{% box %}

**Important**: SQL commands need a semicolon at the end of the line. This is not optional and stuff will break if you forget it.

{% endbox %}

### Setting up the workshop database

Download the starter files and `cd` into the directory. Type `psql` in your terminal to enter the Postgres command-line interface. You can type <kbd>ctrl</kbd> + <kbd>d</kbd> to exit this at any time.

To create a database use the `CREATE DATABASE` command and give it whatever name you like:

```sql
CREATE DATABASE blog_workshop;
```

You should now be able to use `\list` to list all the databases on your machine. Hopefully the new `blog_workshop` is there. You can type `q` to exit this view.

You can then connect to the new database using the `\connect`:

```shell
\connect blog_workshop
```

Now you need to populate the database with some data. The `init.sql` file contains a bunch of SQL commands. They create some tables and then insert data into them.

You can use `\include` to run some SQL directly from a file (which saves a lot of typing):

```shell
\include init.sql
```

If you run `\dt` you should see all the **d**atabase **t**ables we just created (`blog_posts`, `blog_comments` and `users`).

## The schema

A "schema" represents all the different things in a database. It says what type of data goes in each column, what columns are in each table, and how tables relate to each other. The schema is represented by the initial SQL used to create the tables (here inside the `init.sql` file).

### Data types

SQL requires us to specify what type of data we're going to use for each entry in advance. Here's a small subset of available types:

#### `SERIAL`

An auto-incrementing number. Useful for IDs where each new entry needs a unique value. SQL will automatically create this when you inser an entry.

#### `VARCHAR(255)`

A variable-length string. The number in brackets specifies the maximum number of characters.

#### `TEXT`

A string of any length.

#### `INTEGER`

A whole number (like `20`). No fractions allowed.

### Constraints

A way to provide additional fine-tuning of a data type. Think of it like input validation. Here are a few useful constraints:

#### `NOT NULL`

This value is required and must always be set.

#### `PRIMARY KEY`

This value is the unique identifier for this entry into the table. Often a `SERIAL` so you don't have to worry about creating unique IDs yourself.

#### `REFERENCES`

This value must match one in another table, like `users(id)`. Used to link tables together so you can find related information (e.g. which user wrote this blog post).

### Our blog database

This specific database represents a blog site. It has users who can write blog posts, and blog posts that can contain comments.

A blog post has to have an author, so each entry in `blog_posts` has a `user_id`, which `REFERENCES` an `id` in the `users` table. This links the two together, so for any given post we can always find the author.

Comments are linked to both a `user` and a `blog_post`, so they have two `REFERENCES`: `post_id` and `user_id`.

Here is the example schema for the `blog_post` table:

| Column       | Type    | Constraints          |
| ------------ | ------- | -------------------- |
| id           | SERIAL  | PRIMARY KEY          |
| user_id      | INTEGER | REFERENCES users(id) |
| text_content | TEXT    |                      |

---

## Retrieving data

Here's a quick overview of some SQL commands used to retrieve data from a database.

### `SELECT`

[`SELECT`](https://www.w3schools.com/sql/sql_select.asp) retrieves data from a table. You need to combine it with `FROM` to specify which table. For example:

```sql
SELECT first_name FROM users;
```

would retrieve the `first_name` column for every row in the `users` table.

| first_name |
| ---------- |
| Alisha     |
| Chelsea    |
| ...        |

Note you can provide comma-separated lists of column names and table names if you want to select multiple things. You can also use the `*` character to select all columns.

### `WHERE`

[`WHERE`](https://www.w3schools.com/sql/sql_where.asp) is a clause that qualifies a `SELECT`. It lets you filter which rows are retrieved based on the values in that row. For example:

```sql
SELECT first_name FROM users WHERE id = 1;
```

would retrive the first name column for any users with an ID of `1`.

| first_name |
| ---------- |
| Alisha     |

### `AND`, `OR` and `NOT`

[`AND`, `OR` and `NOT`](https://www.w3schools.com/sql/sql_and_or.asp) are operators for expressing logic in your `WHERE` clauses. They let you apply multiple conditions. For example:

```sql
SELECT first_name FROM users WHERE id = 1 OR id = 2;
```

would retrieve the first name column for any users with an ID of `1` _or_ `2`.

| first_name |
| ---------- |
| Alisha     |
| Chelsea    |

### `IN`

The [`IN`](https://www.w3schools.com/sql/sql_in.asp) operator lets you match against a list of values in your `WHERE` clause. For example:

```sql
SELECT first_name FROM users WHERE id IN (1, 2);
```

would select the first name column for any users with an ID of `1` or `2`.

| first_name |
| ---------- |
| Alisha     |
| Chelsea    |

This is similar to the `OR` operator we saw above.

---

### Challenge 1: retrieving data

1. #### Select specific columns

   Using [`SELECT`](https://www.w3schools.com/sql/sql_select.asp), retrieve a list of _only_ usernames and locations from the `users` table

   **Expected Result**

   | username  | location       |
   | --------- | -------------- |
   | Sery1976  | Middlehill, UK |
   | Notne1991 | Sunipol, UK    |
   | Moull1990 | Wanlip, UK     |
   | Spont1935 | Saxilby, UK    |

   {% disclosure %}

   ```sql
   SELECT username, location FROM users;
   ```

   {% enddisclosure %}

1. #### Select users conditionally

   Using `SELECT` and [`WHERE`](https://www.w3schools.com/sql/sql_where.asp), retrieve every column for all users who are older than 40.

   ##### Expected Result

   | id  | username  | age | first_name | last_name | location    |
   | --- | --------- | --- | ---------- | --------- | ----------- |
   | 3   | Moull1990 | 41  | Skye       | Hobbs     | Wanlip, UK  |
   | 4   | Spont1935 | 72  | Matthew    | Griffin   | Saxilby, UK |

   {% disclosure %}

   ```sql
   SELECT * FROM users
     WHERE age > 40;
   ```

   {% enddisclosure %}

1. #### Select users using multiple conditions

   Using `SELECT` and `WHERE`, retrieve the first, last name and location of the user who lives in `Saxilby, UK` and is older than 40.

   ##### Expected Result

   | first_name | last_name | location    |
   | ---------- | --------- | ----------- |
   | Matthew    | Griffin   | Saxilby, UK |

   {% disclosure %}

   ```sql
   SELECT first_name, last_name, location FROM users
     WHERE location = 'Saxilby, UK' AND age > 40;
   ```

   {% enddisclosure %}

1. #### Select posts using multiple conditions

   Using `WHERE` and [`IN`](https://www.w3schools.com/sql/sql_in.asp), retrieve the user ID and text content columns for posts created by users with IDs of `2` or `3`.

   ##### Expected Result

   | user_id | text_content                                                          |
   | ------- | --------------------------------------------------------------------- |
   | 2       | Peculiar trifling absolute and wandered vicinity property yet. decay. |
   | 3       | Far stairs now coming bed oppose hunted become his.                   |

   {% disclosure %}

   ```sql
   SELECT user_id, text_content FROM blog_posts
     WHERE user_id IN (2, 3);
   ```

   {% enddisclosure %}

---

## Creating and updating data

Here's an overview of SQL commands used to add data to a database.

### `INSERT INTO`

[`INSERT INTO`](https://www.w3schools.com/sql/sql_insert.asp) lets you add a new row into a table. You specify a table name and list of columns, then a list of values to insert. The values have to match positions with their respective columns (like function arguments in JS).

```sql
INSERT INTO users (username, first_name) VALUES ('oliverjam', 'oli');
```

would create a new user row with a username of `'oliverjam'` and first name of `'oli'`.

### `UPDATE`

[`UPDATE`](https://www.w3schools.com/sql/sql_update.asp) lets you change existing data in a table. You provide the table name, then the name and new value of each column. You also need to provide a `WHERE` clause to select which rows to update, otherwise **every** row will be changed.

```sql
UPDATE users SET first_name = 'oliver' WHERE username = 'oliverjam';
```

would update the first name of the user with username `"oliverjam"` to be `"oliver"`.

### `RETURNING`

You can access the created/changed rows with a `RETURNING` clause after your `INSERT` or `UPDATE`. This lets you specify which columns you want back. This saves you doing a whole extra `SELECT` after an insert just to get the new entry's ID.

```sql
INSERT INTO users (username, first_name) VALUES ('oliverjam', 'oli')
  RETURNING id, username;
```

Would return:

| id  | username  |
| --- | --------- |
| 1   | oliverjam |

{% box "error" %}

`RETURNING` is a Postgres-specific feature, so it won't work in other databases (like MySQL).

{% endbox %}

---

### Creating and updating data challenges

1. #### Adding a new post

   Using [`INSERT INTO`](https://www.w3schools.com/sql/sql_insert.asp) and `RETURNING`, add a blog post with the text "Hello World" to the user with ID `1`. Return the text content and user ID of the inserted post.

   ##### Expected Result

   | text_content | user_id |
   | ------------ | ------- |
   | Hello World  | 1       |

   {% disclosure %}

   ```sql
   INSERT INTO blog_posts (text_content, user_id)
     VALUES ('Hello World', 1)
     RETURNING text_content, user_id
   ;
   ```

   {% enddisclosure %}

1. #### Updating an existing post

   Using [`UPDATE`](https://www.w3schools.com/sql/sql_update.asp), update the blog post from the previous question to change the author to the user with ID `2`. **Make sure you don't change any other posts**.

   You can then run `SELECT user_id FROM blog_posts WHERE text_content='Hello World';` to test for the expected result.

   ##### Expected Result

   | user_id |
   | ------- |
   | 2       |

   {% disclosure %}

   ```sql
   UPDATE blog_posts SET user_id=2
     WHERE text_content='Hello World';
   ```

   {% enddisclosure %}

---

## Combining tables

We can use [`JOIN`](https://www.w3schools.com/sql/sql_join.asp)s to select columns from multiple tables at once, based on a _relation_ they share. Joins effectively combine multiple tables into one temporary table for you to query.

There are different types of joins that determine exactly what data is returned. Since we're selecting from multiple tables we namespace our columns with the table name and a `.`, just like object access in JavaScript (e.g. `SELECT users.username, blog_posts.text_content`).

### `INNER JOIN`

[`INNER JOIN`](https://www.w3schools.com/sql/sql_join_inner.asp) selects rows that have matching values in _both_ tables being selected from. For example if we wanted to select all the users who have blogposts, then get their usernames _and_ their blog posts' text content:

```sql
SELECT users.username, blog_posts.text_content
  FROM users INNER JOIN blog_posts
    ON users.id = blog_posts.user_id;
```

| username  | text_content                                                        |
| --------- | ------------------------------------------------------------------- |
| Sery1976  | Announcing of invitation principles in.                             |
| Notne1991 | Peculiar trifling absolute and wandered vicinity property yet. son. |
| Moull1990 | Far stairs now coming bed oppose hunted become his.                 |

`INNER JOIN` returns only the the users that have blog posts.

![Venn diagram of an inner join—only the overlap of two circles is highlighted](images/inner-join.png)

### `LEFT JOIN`

[`LEFT JOIN`](https://www.w3schools.com/sql/sql_join_left.asp) selects every entry in the first table you name, but only matched records from the second. For example if we wanted a list of _every_ user, plus their blog posts' text content (if they have any):

```sql
SELECT users.username, blog_posts.text_content
  FROM users LEFT JOIN blog_posts
    ON users.id = blog_posts.user_id;
```

| username  | text_content                                                       |
| --------- | ------------------------------------------------------------------ |
| Sery1976  | Announcing of invitation principles in.                            |
| Notne1991 | Peculiar trifling absolute and wandered vicinity property yet.son. |
| Moull1990 | Far stairs now coming bed oppose hunted become his.                |
| Spont1935 |                                                                    |

`LEFT JOIN` selects one extra row here compared to `INNER JOIN`: the final user "Spont1935" who has no blog posts.

![Venn diagram of a left join—the left circle and overlap with the right circle is highlighted](images/left-join.png)

### `RIGHT JOIN`

[`RIGHT JOIN`](https://www.w3schools.com/sql/sql_join_right.asp) is like the opposite of `LEFT JOIN`. With our blog post data the result would be the same as an `INNER JOIN`, since every post must have an author.

![Venn diagram of a left join—the right circle and overlap with the left circle is highlighted](images/right-join.png)

---

### Combining tables challenges

1. #### Selecting users and comments

   Using [`LEFT JOIN`](https://www.w3schools.com/sql/sql_join_left.asp) select **every** user's location, plus the content of any comments they've made.

   ##### Expected Result

   | location       | text_content     |
   | -------------- | ---------------- |
   | Middlehill, UK |                  |
   | Sunipol, UK    | Great blog post! |
   | Wanlip, UK     |                  |
   | Saxilby, UK    |                  |

   {% disclosure %}

   ```sql
   SELECT users.location, post_comments.text_content
     FROM users
     LEFT JOIN post_comments ON users.id = post_comments.user_id;
   ```

   {% enddisclosure %}

1. #### Selecting blog posts and comments

   Using [`INNER JOIN`](https://www.w3schools.com/sql/sql_join_inner.asp) select only blog posts with comments, returning the text_content of the blog posts and the text_content of the comments.

   ##### Expected Result

   | text_content                                        | text_content     |
   | --------------------------------------------------- | ---------------- |
   | Far stairs now coming bed oppose hunted become his. | Great blog post! |

   {% disclosure %}

   ```sql
   SELECT blog_posts.text_content, post_comments.text_content
     FROM blog_posts
     INNER JOIN post_comments ON blog_posts.id = post_comments.post_id;
   ```

   {% enddisclosure %}

1. #### Bonus: select the user who made a comment

   Expand your previous solution to also include the username of the user who made each comment.

   ##### Expected Result

   | text_content                                        | text_content     | username  |
   | --------------------------------------------------- | ---------------- | --------- |
   | Far stairs now coming bed oppose hunted become his. | Great blog post! | Notne1991 |

   {% box %}

   **Hint**: you can use more than one join to link multiple tables.

   {% endbox %}

   {% disclosure %}

   ```sql
   SELECT blog_posts.text_content, post_comments.text_content, users.username
     FROM blog_posts
     INNER JOIN post_comments ON blog_posts.id = post_comments.post_id
     INNER JOIN users ON users.id = post_comments.user_id;
   ```

   {% enddisclosure %}

## Bonus: Sub queries

You can nest SQL expressions. For example:

```sql
SELECT * FROM dogs WHERE owner = (SELECT name FROM humans WHERE id = 1)
```

is the equivalent of:

```sql
SELECT * FROM dogs WHERE owner = 'oli';
```

if there's a human with ID 1 and name 'oli'. The nested query is resolved first, similar to using brackets in maths.

### Add a comment to a post

Add a new comment to the `post_comments` table. It should have a user ID of `3` and text content `'Interesting post'`. The comment should be linked to whichever post has text content of `'Peculiar trifling absolute and wandered vicinity property yet.'` (i.e. its `post_id` should be the ID of that post).

You can then run `SELECT text_content FROM post_comments WHERE post_id = 2;` to test for the expected result.

#### Expected Result

| text_content     |
| ---------------- |
| Interesting post |

{% disclosure %}

```sql
INSERT INTO post_comments (post_id, user_id, text_content)
  VALUES (
    (
      SELECT id FROM blog_posts
        WHERE text_content = 'Peculiar trifling absolute and wandered vicinity property yet.'
    ),
    3,
    'Interesting post'
  )
;
```

{% enddisclosure %}
