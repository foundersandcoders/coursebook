BEGIN;

DROP TABLE IF EXISTS users, blog_posts, post_comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age INTEGER,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  location VARCHAR(255)
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_content TEXT
);

CREATE TABLE post_comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES blog_posts(id),
  user_id INTEGER REFERENCES users(id),
  text_content TEXT
);

INSERT INTO users (username, age, first_name, last_name, location) VALUES
  ('Sery1976', 28, 'Alisha', 'Clayton', 'Middlehill, UK'),
  ('Notne1991', 36, 'Chelsea', 'Cross', 'Sunipol, UK'),
  ('Moull1990', 41, 'Skye', 'Hobbs', 'Wanlip, UK'),
  ('Spont1935', 72, 'Matthew', 'Griffin', 'Saxilby, UK')
;

INSERT INTO blog_posts (text_content, user_id) VALUES
  ('Announcing of invitation principles in. Cold in late or deal.', 1),
  ('Peculiar trifling absolute and wandered vicinity property yet.', 2),
  ('Far stairs now coming bed oppose hunted become his.', 3)
;

INSERT INTO post_comments (post_id, user_id, text_content) VALUES
  (3, 2, 'Great blog post!')
;

COMMIT;