BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age INTEGER,
  location VARCHAR(255)
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_content TEXT
);

INSERT INTO users (username, age, location) VALUES
  ('Sery1976', 28, 'Middlehill, UK'),
  ('Notne1991', 36, 'Sunipol, UK'),
  ('Moull1990', 41, 'Wanlip, UK'),
  ('Spont1935', 72, 'Saxilby, UK'),
  ('Precand', 19, 'Stanton, UK')
;

INSERT INTO blog_posts (text_content, user_id) VALUES
  ('Announcing of invitation principles in.', 1),
  ('Peculiar trifling absolute and wandered yet.', 2),
  ('Far stairs now coming bed oppose hunted become his.', 3),
  ('Curabitur arcu quam, imperdiet ac orci ac.', 4),
  ('Aenean blandit risus sed pellentesque.', 5)
;

COMMIT;