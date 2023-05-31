# Intro to Databases

How do web applications store and retrieve vast amounts of information? How does an e-commerce website keep track of its products and inventory? Or how does a social media platform manage user profiles and posts? The answer lies in databases. Here, we'll introduce you to the concept of databases and explain their role in web development.

## Understanding Databases

At its core, a database is a structured collection of information. The term "structured" implies that the data can be easily organised and queried by a computer. This is opposed to for example a paragraph in a book that can contain data but lacks structure.

To better grasp structured data, here are a few examples:

1. **HTML table**: Structured data as it organises information into rows and columns, making it easy to access and present.
2. **JSON object**: Structured data format for exchanging information between servers and web applications, following a specific syntax of key-value pairs or arrays.
3. **Spreadsheet**: Structured data tool that organises information into rows and columns, allowing for efficient data organisation and analysis.

## Relational Databases: Memory vs. Storage

Computers have two primary forms of storage: memory (RAM) and disk storage. Memory allows a computer to store and quickly access data that it actively uses. However, memory is relatively expensive and limited, typically ranging from 8 to 16 gigabytes in modern computers. On the other hand, disk storage, though slower, is more cost-effective and offers larger capacities, typically reaching hundreds of gigabytes.

In the early days of computing, memory was extremely expensive, leading to the development of databases optimised for memory usage. These databases are known as "relational" databases. They store data in tables, resembling spreadsheets, and allow efficient data access.

For instance, consider a table named "fruits" that contains information about fruit names, quantities, and prices:

| name   | quantity | price |
| ------ | -------- | ----- |
| apple  | 10       | 1.00  |
| banana | 20       | 0.40  |

To establish relationships between different tables, relational databases introduce the concept of "foreign keys." Suppose we have another table named "stores" that includes store locations and IDs:

| id  | location   |
| --- | ---------- |
| 1   | camden     |
| 2   | kensington |

By adding a foreign key, such as the "store_id" column, to the "fruits" table, we can relate each fruit entry to a specific store:

| name   | quantity | price | store_id |
| ------ | -------- | ----- | -------- |
| apple  | 10       | 1.00  | 1        |
| banana | 20       | 0.40  | 1        |
| apple  | 05       | 1.20  | 2        |
| banana | 30       | 0.20  | 2        |

This relational structure minimises data duplication and allows us to determine which store offers which fruit at what price easily.

## Advantages of Relational Databases

The relational database structure offers several advantages. Firstly, it reduces data duplication, as each store is listed only once, regardless of the number of fruits they have. Comparatively, representing the same information using objects would result in duplicated store details within each fruit object.

Consider the following JSON representation:

```json
{
  "fruits": [
    {
      "name": "apple",
      "quantity": 10,
      "price": 1,
      "store": { "id": 1, "location": "camden" }
    },
    {
      "name": "banana",
      "quantity": 20,
      "price": 0.4,
      "store": { "id": 1, "location": "camden" }
    },
    {...}
  ]
}

```

In a database with thousands of entries, this approach would result in significant duplication. By employing relational databases, we save storage space and ensure data consistency.

Secondly, relational databases simplify answering certain types of questions. For example, determining the total quantity of fruit requires adding up the "quantity" column, without the need to consider the associated stores. Relational databases enable efficient querying and data analysis.

## Popular Relational Databases and SQL

Several popular relational databases are widely used in web development, including MySQL, PostgreSQL, and SQLite. They offer robust features, performance, and compatibility with various programming languages.

To interact with a relational database, developers use Structured Query Language (SQL). SQL is a specialised language for retrieving and manipulating data in a relational database. For example, the following SQL query retrieves the "name" and "quantity" columns from the "fruits" table:

```sql
SELECT name, quantity FROM fruits;
```

SQL empowers developers to extract information from the database and perform complex operations using a standardised syntax.

## Non-relational Databases and NoSQL

As computer memory became cheaper, alternative database solutions emerged. These databases utilised less structured data storage approaches, such as objects. While they might be less efficient in terms of storage utilisation, they offered faster data retrieval by keeping everything in memory. These databases were dubbed "NoSQL" databases due to their lack of support for SQL.

MongoDB and CouchDB are examples of popular NoSQL databases. Developers often prefer NoSQL databases when the object-oriented paradigm aligns better with their mental model and the requirements of their projects. However, for most web development scenarios, relational databases remain the safer and more versatile choice.

We’ll be using SQLite as our relational database. SQLite is lightweight, easy to set up, and provides a smooth learning experience.

## Using Relational DBs

### Understanding Relationships

Relational databases excel at managing three main types of relationships: one-to-one, one-to-many, and many-to-many.

1. **One-to-one relationship**: In this type, each entity in one table corresponds to exactly one entity in another table. For example, each country has one capital city, and each capital city belongs to one country.

   **Tables**

   countries

   | id  | name | capital_id |
   | --- | ---- | ---------- |
   | 1   | uk   | 1          |
   | 2   | usa  | 2          |

   cities

   | id  | name          | population |
   | --- | ------------- | ---------- |
   | 1   | london        | 8.9m       |
   | 2   | washington dc | 0.7m       |

   We use a “foreign key” to create relationships.

   The `capital_id` column in `countries` represents a row in `cities`.

2. **One-to-many relationship**: This relationship exists when each entity in one table is associated with multiple entities in another table, but each entity in the second table corresponds to only one entity in the first table. For instance, a director can create multiple films, while each film has only one director.

   **Tables**

   directors

   | id  | name          |
   | --- | ------------- |
   | 1   | Olivia Wilde  |
   | 2   | Sofia Coppola |

   films

   | id  | name                | director_id |
   | --- | ------------------- | ----------- |
   | 1   | booksmart           | 1           |
   | 2   | lost in translation | 2           |
   | 3   | the bling ring      | 2           |

   The only difference here is the foreign keys aren’t unique.

   We represent the “many” relationship by using the same `director_id` for multiple films.

3. **Many-to-many relationship**: This relationship occurs when multiple entities in one table are associated with multiple entities in another table. A classic example is the relationship between actors and films. An actor can appear in many films, and a film can include multiple actors.

   **Tables**

   actors

   | id  | name           |
   | --- | -------------- |
   | 1   | Cate Blanchett |
   | 2   | Ian McKellan   |

   films

   | id  | name                             |
   | --- | -------------------------------- |
   | 1   | LOTR: The Fellowship of the Ring |
   | 2   | X-Men                            |
   | 3   | Ocean's 8                        |

   actors_films (join table)

   | actor_id | film_id |
   | -------- | ------- |
   | 1        | 1       |
   | 1        | 3       |
   | 2        | 1       |
   | 2        | 2       |

We cannot use foreign keys here since each film would need multiple `actor_id`columns. Instead we can use another table to store the relationships.

In a many-to-many relationship, a join table bridges the gap between the two related tables. By using the join table "actors_films," we can associate actors with the films they appear in. This allows us to look up an actor's films efficiently.

For example, the following SQL query retrieves the names of actors and the names of films they appear in:

```sql
SELECT actors.name, films.name
  FROM actors
    JOIN actors_films ON actors.id = actor_id
    JOIN films ON actor_id = films.id;
```

---

In conclusion, relational databases offer powerful features, minimise data duplication, and allow for complex querying using SQL. While non-relational databases offer flexibility and speed, relational databases remain the go-to choice for most web development scenarios.
