Your project this week is to build a web app that stores data in a SQLite database.

## Spike

Before you start writing features you need to design the schema for your data. Think about what different things your app needs to store, how they relate to each other, and how you can avoid duplicating information. Record your schema in your `README.md` using Markdown tables. Consider embedding a [diagram](https://dbdiagram.io/) to help visualise the relationships.

### Questions to consider

1. What kinds of data relationships are there?
1. What's a foreign key? How can they help us design schemas with relational data?

### Useful resources

- [Database Relationships](https://www.lifewire.com/database-relationships-p2-1019758)
- [A beginner's guide to many-to-many relationships](https://support.airtable.com/docs/airtable-s-guide-to-many-to-many-relationships)

## User stories

### Core

- **As a user, I want to**: submit information to your site for anyone to see
- **As a user, I want to**: come back to your site later and see what I posted is still there

Since this project is open-ended you'll need to write your own more specific user stories once you know what you want to build.

### Example project ideas

- Founders & Coders book sharing system
- Food / coffee recommendations around Founders & Coders
- Founders & Coders events calendar

## Acceptance Criteria

- [ ] A form for users to submit data
- [ ] A page showing all the data
- [ ] Semantic form elements with correctly associated labels
- [ ] A SQLite database, deployed to fly.io as a [persistent volume](#deploying-persistent-volumes-to-fly-io)
- [ ] A schema describing your database in your README
- [ ] Tests for server routes and database access
- [ ] Not process user input as SQL commands
- [ ] Hidden environment variables (i.e. not on GitHub)

### Stretch criteria

- [ ] A way to view filtered/sorted data, instead of just all of it
- [ ] GitHub Actions CI setup to run your tests when you push

## Deploying persistent volumes to Fly.io

A simple mental model for app deployment is that we’re installing and running our app on a computer in the cloud. Yet this is an oversimplification and an important difference is that the PaaS services we use for deployment (ie Fly) have an ephemeral file system.

An ephemeral file system is a type of file system that is not permanently stored on a device or disk. It exists only for a short period of time, and any files or data stored in it are not persisted after the session ends or the file system is deleted. This type of file system is usually used in cloud computing environment as it allows for greater flexibility and efficiency compared to using permanent storage.

As Fly uses an ephemeral file system and SQLite works by storing the database as a file on the system we need to make special provisions for deployment. If we didn’t, then our database would disappear every time the file system is restarted.

To solve this we’re going to use Fly’s [Volume’s feature](https://fly.io/docs/reference/volumes/).

### Adding a volume to your app

1. [Install the Fly CLI and deploy your app](https://oliverjam.es/articles/deploying-to-fly#how-do-you-deploy) if you haven’t already.
2. Create a volume by running the following command

   `flyctl volumes create data --region lhr --size 1`

   This will create a 1GB volume for the app whose `fly.toml` is in the current directory.

   You can think of a volume as being like an external hard drive that we get to use with our app.

3. You can use the volume you just created in your app by adding it to the `fly.toml`:

   ```
   [mounts]
      source = "data"
      destination = "/data"
   ```

   This will tell us the directory under which this volume can be used, i.e. the volume `data` that we created in the last step will be available on the path `/data` when our app runs on `Fly.io` 's servers.

4. Now we have to deploy again so that the app knows about our updated `fly.toml` file

   `flyctl deploy`

5. The last step is to set the environment variable which we use in the our app (i.e. in `database/db.js`). On fly, this needs to point to the directory we referenced in our `fly.toml` file (ie `data/`)

   `flyctl secrets set DB_FILE=/data/db.sqlite`

### Seeding your app

We might also want to seed our database with initial data in our deployment environment. When we do this locally we usually run a command on the terminal which calls a script to insert the data, e.g. `node src/database/seed.js`.

We’re going to do something similar to seed the remote data, but instead of running a command on our local terminal, we’re going to connect to the virtual machine that Fly has spun up for our app and run a command on that virtual machine’s terminal.

1. Before we connecting to the virtual machine, we'll need to add the `volta` key to our `package.json`. [Volta](https://volta.sh/) is the tool that Fly uses to manage node versions.

   Let's add the following to our `package.json` (making sure that the node version you specify is the same one as in the generated `Dockerfile`)

   ```
   {
      ...
      "volta": {
         "node": "18.10.0"
      }
   }
   ```

   Then run `flyctl deploy` to get these changes onto our deployed app.

1. To connect to the remote virtual machine we run the following command. SSH stands for Secure Shell and is a way to securely connect to another computer over a network.

   `flyctl ssh console`

1. Once you’ve connected to the terminal you can find your files in the `app/` directory and from there you can run your script.

   `cd app`

   `node src/database/seed.js`

Your database should now be seeded and you can check this by going to the URL for your deployed app and checking the data is there.
