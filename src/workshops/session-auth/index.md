---
title: Session authentication
description: Learn how to log users in using session cookies
tags:
  - workshop
  - js
keywords:
  - js
  - authentication
  - postgres
---

This workshop will show you how to combine password-based authentication with cookie-based sessions to keep users logged in to your site.

**This is a work in progress**

1. Get the Postgres DB set up
1. Write model functions to create and retrieve sessions from DB
   - The `sessions` table has two columns: `sid TEXT PRIMARY KEY` and `data JSON`
1. Write auth functions to handle various tasks:
   - `auth.createUser`: takes email/password, hashes pw, inserts into DB
   - `auth.createUserSession`: takes user, generates unique sid, inserts new session into DB with user data
   - `auth.verifyUser`: takes email/pw, compares pw to stored hash, either throws error for mismatch or returns user
1. Use auth functions to make signup/login routes work
   - `GET /sign-up`: uses `auth.createUser` and `auth.createUserSession` to handle new user sign ups. Should set session cookie and redirect to home after.
   - `GET /log-in`: uses `auth.verifyUser` and `auth.createUserSession` to handle existing user logging in. Should set session cookie and redirect to home after.
