--
-- Retrieving data challenges
--

-- 1. Select specific columns
SELECT username, location FROM users;

-- 2. Select users conditionally
SELECT * FROM users WHERE age > 40;

-- 3. Select users using multiple conditions
SELECT first_name, last_name, location FROM users
  WHERE location = 'Saxilby, UK' AND age > 40;

-- 4. Select posts using multiple conditions
SELECT user_id, text_content FROM blog_posts WHERE user_id IN (2, 3);


--
-- Creating and updating data challenges
--

-- 1. Adding a new post
INSERT INTO blog_posts (text_content, user_id)
  VALUES ('Hello World', 1)
  RETURNING text_content, user_id
;

-- 2. Updating an existing post
UPDATE blog_posts SET user_id=2 WHERE text_content='Hello World';


--
-- Combining tables challenges
--

-- 1. Selecting users and comments
SELECT users.location, post_comments.text_content
  FROM users
  LEFT JOIN post_comments ON users.id = post_comments.user_id;

-- 2. Selecting blog posts and comments
SELECT blog_posts.text_content, post_comments.text_content
  FROM blog_posts
  INNER JOIN post_comments ON blog_posts.id = post_comments.post_id;

-- 3. Bonus: select the user who made a comment
SELECT blog_posts.text_content, post_comments.text_content, users.username
  FROM blog_posts
  INNER JOIN post_comments ON blog_posts.id = post_comments.post_id
  INNER JOIN users ON users.id = post_comments.user_id;


--
-- Bonus: Sub queries
--
INSERT INTO post_comments (post_id, reply_to, user_id, text_content)
  VALUES (
    (
      SELECT id FROM blog_posts
        WHERE text_content = 'Peculiar trifling absolute and wandered vicinity property yet.'
    ),
    3,
    'Interesting post'
  )
;
