# .NET

## Intro

Learners with build a library in which to sort and share information (i.e. music, photos, recipes etc...). Potential users should be able to view, favourite and upload items as well as make collections and view ones created by other users.

The frontend of this project will be built using React. For the backend, it will use ASP.NET to handle server-side functionality. User accounts and item lists will be stored in a PostgreSQL or SQLite database.

## Project

Your project for the next 3 weeks will be to develop a .NET backend connected to a database and linked to a React frontend. This week you should start by building the backend and testing it with Swagger (.NET equivalent to Postman). Tests should cover the creation users and endpoints related to user content.

## Spike

Like the last project you will benefit by building a scheme for your database before you start. Hopefully with what you learned from last projects you are ready to think about how things will connect and consider what sorts of endpoints you will want. Finally, think about what you have done for stretch goals on previous projects and see if you can come up with a different sort of goal this time. For example if you've been stretching yourself by adding technical complexity try focusing on design or UX/UI instead.

### Questions to consider

1. What endpoints will you need for your app?
2. What sort of classes will you need to match your data and how will these be represented in OOP (object orientated programming)?

### Useful resources

- [Simple demo of react and .NET project](https://www.c-sharpcorner.com/article/a-react-front-end-with-a-net-web-api-back-end-application/)
- [Demo of a more complicated backend with a database](https://www.c-sharpcorner.com/article/building-a-powerful-asp-net-core-web-api-with-postgresql/)

### User stories

As a **user**, I want to:

- Login to an individual account
- See my collections of items and favourites
- Search and look at other users collections
- View individual items details
- Save items or collections from other users
- Upload and add items

### Stretch user stories

- Follow other users
- Make sure users can only edit their own collections and items
- Stop duplicate items being uploaded
- Suggest collections based on favourites

## Repository naming convention

Please name your repo following this template:
PRO05_Name1_Name2_Name3_Name4

## Acceptance criteria

- [ ] Backend is in a mostly completed state and attached to a rough draft front end
- [ ] Database persists user data
- [ ] Users can create collections and add their own or others items to them
- [ ] Users can search and filter collections, users and items
- [ ] Users can log in/out and have that data persist

### Stretch

- [ ] Begin testing (it'll be different in .NET)

---

# PHP

**Project Overview: Building a Custom WordPress Site with Theme and Plugin Development**

Over the next three weeks, you will develop a fully functional WordPress website from scratch. Starting with setting up your local development environment, you'll create a custom theme tailored to your design preferences, incorporating dynamic content using The Loop and interactive elements with TypeScript. You'll then plan and build a custom plugin to add significant functionality to your site, such as an event manager or testimonials feature, utilizing custom post types, taxonomies, and AJAX for dynamic updates.

In the final week, you'll focus on deploying your site to a live hosting environment, implementing security best practices, and optimizing performance. By integrating your custom plugin with your theme, you'll create a seamless user experience. This project will enhance your proficiency in WordPress development and PHP programming, providing you with valuable skills and a portfolio-worthy website.

### **Foundations of WordPress and PHP**

#### **Monday: Setting Up the Development Environment**

- **Objectives:**

  - Set up a local server environment for WordPress development.
  - Install and configure WordPress locally.
  - Understand the WordPress file and folder structure.

- **Activities:**

  1. **Install a Local Server Environment:**

     - **Choose and Install Software:**
       - **Windows Users:** Download and install [XAMPP](https://www.apachefriends.org/index.html).
       - **Mac Users:** Download and install [MAMP](https://www.mamp.info/en/).
     - **Configure the Server:**
       - Start Apache and MySQL services from the control panel.

  2. **Download and Install WordPress Locally:**

     - **Download WordPress:**
       - Get the latest version from the [official website](https://wordpress.org/download/).
     - **Set Up the Database:**
       - Access `phpMyAdmin` via `http://localhost/phpmyadmin/`.
       - Create a new database (e.g., `wordpress_db`).
     - **Configure WordPress:**
       - Extract WordPress files into the `htdocs` (XAMPP) or `MAMP` directory.
       - Rename `wp-config-sample.php` to `wp-config.php`.
       - Edit `wp-config.php` with the database details:
         ```php
         define('DB_NAME', 'wordpress_db');
         define('DB_USER', 'root');
         define('DB_PASSWORD', '');
         ```
     - **Run the Installation Script:**
       - Navigate to `http://localhost/wordpress/` and follow the installation prompts.

  3. **Explore WordPress File Structure:**

     - **Directories to Explore:**
       - `wp-content`: Holds themes, plugins, and uploads.
       - `wp-includes`: Core WordPress files.
       - `wp-admin`: Backend administration files.
     - **Understanding Core Files:**
       - Review `index.php`, `wp-config.php`, and `.htaccess`.

  4. **Review PHP Basics (If Needed):**
     - **PHP Syntax and Structure:**
       - Variables, arrays, loops, functions.
     - **Resources:**
       - [PHP Manual](https://www.php.net/manual/en/langref.php)
       - [W3Schools PHP Tutorial](https://www.w3schools.com/php/)

- **Resources:**
  - [Installing WordPress Locally (WPBeginner)](https://www.wpbeginner.com/wp-tutorials/how-to-install-wordpress-locally-on-windows-using-xampp/)
  - [WordPress File Structure Overview (Official Docs)](https://developer.wordpress.org/themes/basics/theme-functions/)

---

#### **Tuesday: Introduction to WordPress Theme Development**

- **Objectives:**

  - Understand how WordPress themes work.
  - Begin developing a custom theme from scratch.

- **Activities:**

  1. **Study the WordPress Template Hierarchy:**

     - **Understand the Hierarchy:**
       - Learn how WordPress determines which template file to use.
       - Review the [Template Hierarchy diagram](https://developer.wordpress.org/themes/basics/template-hierarchy/).

  2. **Create a New Theme Directory:**

     - **Set Up Theme Folder:**
       - Navigate to `wp-content/themes/`.
       - Create a new folder for your theme (e.g., `my-custom-theme`).

  3. **Develop Basic Theme Files:**

     - **`style.css`:**
       - Add theme information at the top:
         ```css
         /*
         Theme Name: My Custom Theme
         Theme URI: http://example.com/
         Author: Your Name
         Description: A custom theme for learning.
         Version: 1.0
         */
         ```
     - **`index.php`:**
       - Basic template file that WordPress uses by default.
       - Add a simple HTML structure:
         ```php
         <!DOCTYPE html>
         <html>
         <head>
           <title><?php bloginfo('name'); ?></title>
           <?php wp_head(); ?>
         </head>
         <body>
           <h1>Welcome to <?php bloginfo('name'); ?></h1>
           <?php wp_footer(); ?>
         </body>
         </html>
         ```
     - **`header.php` and `footer.php`:**
       - Separate the header and footer sections.
       - **`header.php`:**
         ```php
         <!DOCTYPE html>
         <html>
         <head>
           <title><?php bloginfo('name'); ?></title>
           <?php wp_head(); ?>
         </head>
         <body>
         ```
       - **`footer.php`:**
         ```php
           <?php wp_footer(); ?>
         </body>
         </html>
         ```
       - Include them in `index.php` using `get_header()` and `get_footer()` functions:
         ```php
         <?php get_header(); ?>
         <h1>Welcome to <?php bloginfo('name'); ?></h1>
         <?php get_footer(); ?>
         ```

  4. **Activate the Theme:**

     - **Through WordPress Admin:**
       - Go to `Appearance > Themes`.
       - Find and activate "My Custom Theme".

  5. **Use Template Tags and The Loop:**

     - **Display Posts:**
       - Implement The Loop in `index.php`:
         ```php
         <?php get_header(); ?>
         <?php
         if ( have_posts() ) :
           while ( have_posts() ) : the_post();
             the_title('<h2>', '</h2>');
             the_content();
           endwhile;
         else :
           echo '<p>No posts found.</p>';
         endif;
         ?>
         <?php get_footer(); ?>
         ```

- **Resources:**
  - [Creating a Basic Theme (ThemeShaper Tutorial)](https://themeshaper.com/2016/10/23/how-to-create-a-wordpress-theme/)
  - [Understanding The Loop (Official Docs)](https://developer.wordpress.org/themes/basics/the-loop/)
  - [WordPress Template Hierarchy (Official Docs)](https://developer.wordpress.org/themes/basics/template-hierarchy/)

---

#### **Wednesday: Advanced Theme Customization**

- **Objectives:**

  - Add features to the custom theme.
  - Integrate TypeScript for front-end interactivity.

- **Activities:**

  1. **Create Custom Page Templates:**

     - **Make a Custom Template:**
       - Create `page-custom.php` in your theme folder.
       - At the top, add:
         ```php
         <?php
         /*
         Template Name: Custom Page
         */
         ?>
         ```
       - Modify the template as needed, for example:
         ```php
         <?php get_header(); ?>
         <div class="custom-page-content">
           <h2>Custom Page Template</h2>
           <?php
           if ( have_posts() ) :
             while ( have_posts() ) : the_post();
               the_content();
             endwhile;
           endif;
           ?>
         </div>
         <?php get_footer(); ?>
         ```

  2. **Implement Custom Menus:**

     - **Register Menus in `functions.php`:**
       ```php
       <?php
       function register_my_menus() {
         register_nav_menus(
           array(
             'header-menu' => __( 'Header Menu' ),
             'footer-menu' => __( 'Footer Menu' )
           )
         );
       }
       add_action( 'init', 'register_my_menus' );
       ```
     - **Display Menus in Templates:**
       ```php
       <?php
       wp_nav_menu( array( 'theme_location' => 'header-menu' ) );
       ?>
       ```

  3. **Add Widget Areas (Sidebars):**

     - **Register Sidebar in `functions.php`:**
       ```php
       function my_custom_sidebar() {
         register_sidebar(
           array (
             'name' => __( 'Custom Sidebar', 'your-theme-domain' ),
             'id' => 'custom-sidebar',
             'description' => __( 'Custom Sidebar for Theme', 'your-theme-domain' ),
             'before_widget' => '<div class="widget-content">',
             'after_widget' => '</div>',
             'before_title' => '<h3 class="widget-title">',
             'after_title' => '</h3>',
           )
         );
       }
       add_action( 'widgets_init', 'my_custom_sidebar' );
       ```
     - **Display Sidebar in Templates:**
       ```php
       <?php
       if ( is_active_sidebar( 'custom-sidebar' ) ) {
         dynamic_sidebar( 'custom-sidebar' );
       }
       ?>
       ```

  4. **Set Up TypeScript Build Process:**

     - **Initialize NPM in Theme Folder:**
       - Open a terminal in your theme directory and run `npm init -y`.
     - **Install Dependencies:**
       - Install Webpack and TypeScript:
         ```bash
         npm install --save-dev webpack webpack-cli typescript ts-loader
         ```
     - **Configure TypeScript:**
       - Create `tsconfig.json`:
         ```json
         {
           "compilerOptions": {
             "target": "es5",
             "module": "commonjs",
             "outDir": "./dist",
             "strict": true
           },
           "include": ["src/**/*"]
         }
         ```
     - **Set Up Webpack Config:**

       - Create `webpack.config.js`:

         ```javascript
         const path = require("path");

         module.exports = {
           entry: "./src/index.ts",
           module: {
             rules: [
               {
                 test: /\.tsx?$/,
                 use: "ts-loader",
                 exclude: /node_modules/,
               },
             ],
           },
           resolve: {
             extensions: [".tsx", ".ts", ".js"],
           },
           output: {
             filename: "bundle.js",
             path: path.resolve(__dirname, "dist"),
           },
         };
         ```

     - **Add Scripts to `package.json`:**
       ```json
       "scripts": {
         "build": "webpack",
         "watch": "webpack --watch"
       }
       ```

  5. **Add Interactive Elements Using TypeScript:**

     - **Create `src/index.ts`:**
       - Example code:
         ```typescript
         document.addEventListener("DOMContentLoaded", () => {
           const element = document.getElementById("interactive-element");
           if (element) {
             element.addEventListener("click", () => {
               alert("TypeScript is working!");
             });
           }
         });
         ```
     - **Build and Include Script:**
       - Run `npm run build`.
       - Enqueue the script in `functions.php`:
         ```php
         function enqueue_my_scripts() {
           wp_enqueue_script( 'my-typescript', get_template_directory_uri() . '/dist/bundle.js', array(), '1.0', true );
         }
         add_action( 'wp_enqueue_scripts', 'enqueue_my_scripts' );
         ```
     - **Add an Element to Test Interaction:**
       - In your template file (e.g., `index.php`), add:
         ```html
         <button id="interactive-element">Click Me</button>
         ```

- **Resources:**
  - [Custom Page Templates (Official Docs)](https://developer.wordpress.org/themes/template-files-section/page-template-files/)
  - [WordPress Menus and Widgets (WPBeginner)](https://www.wpbeginner.com/wp-themes/how-to-add-navigation-menu-in-wordpress-beginners-guide/)
  - [Webpack and TypeScript Setup Guide (DigitalOcean)](https://www.digitalocean.com/community/tutorials/setting-up-a-typescript-project-with-webpack)
  - [Using TypeScript with WordPress](https://wptavern.com/using-typescript-to-write-wordpress-plugins)

---

#### **Thursday: Presentation Preparation and Delivery**

- **Objectives:**

  - Prepare and deliver a 20-minute presentation showcasing the custom theme.
  - Continue normal development activities.

- **Activities:**

  1. **Morning Development:**

     - **Enhance Theme Features:**
       - Refine your theme based on previous work.
       - Add any additional features or styling improvements.
     - **Debug and Test:**
       - Ensure all features are working as expected.
       - Test across different browsers and devices.

  2. **Presentation Preparation (1 hour):**

     - **Summarize Work Done:**
       - Create an outline highlighting key features and customizations.
     - **Prepare Presentation Materials:**
       - Create slides if necessary.
       - Set up a live demo environment.
     - **Rehearse:**
       - Practice delivering the presentation within the time limit.

  3. **Deliver the Presentation (20 minutes):**

     - **Presentation Content:**
       - Introduce your custom theme and its purpose.
       - Demonstrate key features and customizations.
       - Discuss challenges faced and solutions implemented.
     - **Engage with the Audience:**
       - Encourage questions and feedback.

  4. **Afternoon Development:**

     - **Implement Feedback:**
       - Incorporate any useful suggestions received during the presentation.
     - **Continue Development:**
       - Proceed with the next planned activities.

- **Resources:**
  - [Effective Presentation Tips](https://www.skillsyouneed.com/present/presentation-tips.html)
  - [Demo Guidelines](https://www.techrepublic.com/article/pro-tips-for-giving-effective-software-demos/)

---

#### **Friday: Working with WordPress Database**

- **Objectives:**

  - Learn to interact with the WordPress database using PHP.
  - Understand data sanitization and security best practices.

- **Activities:**

  1. **Using `$wpdb` for Database Queries:**

     - **Global `$wpdb` Object:**
       - Access the database using `$wpdb`.
     - **Retrieve Data:**
       ```php
       global $wpdb;
       $results = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}posts WHERE post_status = 'publish'" );
       foreach ( $results as $post ) {
         echo $post->post_title;
       }
       ```
     - **Display Data in the Theme:**
       - Create a custom template or modify an existing one to display the data.

  2. **Create a Custom Table:**

     - **Register Activation Hook:**

       ```php
       register_activation_hook( __FILE__, 'create_custom_table' );
       function create_custom_table() {
         global $wpdb;
         $table_name = $wpdb->prefix . 'custom_table';
         $charset_collate = $wpdb->get_charset_collate();

         $sql = "CREATE TABLE $table_name (
           id mediumint(9) NOT NULL AUTO_INCREMENT,
           time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
           name tinytext NOT NULL,
           email VARCHAR(100) NOT NULL,
           PRIMARY KEY  (id)
         ) $charset_collate;";

         require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
         dbDelta( $sql );
       }
       ```

  3. **Create a Form to Save Data:**

     - **Display Form Using Shortcode:**
       ```php
       function custom_form_shortcode() {
         ob_start();
         ?>
         <form method="post">
           <?php wp_nonce_field( 'submit_form' ); ?>
           <input type="text" name="name" placeholder="Name" required>
           <input type="email" name="email" placeholder="Email" required>
           <input type="submit" name="submit_form" value="Submit">
         </form>
         <?php
         return ob_get_clean();
       }
       add_shortcode( 'custom_form', 'custom_form_shortcode' );
       ```
     - **Handle Form Submission:**

       ```php
       function handle_form_submission() {
         if ( isset( $_POST['submit_form'] ) ) {
           // Security check
           if ( ! wp_verify_nonce( $_POST['_wpnonce'], 'submit_form' ) ) {
             die( 'Security check failed' );
           }

           global $wpdb;
           $table_name = $wpdb->prefix . 'custom_table';
           $name = sanitize_text_field( $_POST['name'] );
           $email = sanitize_email( $_POST['email'] );

           $wpdb->insert(
             $table_name,
             array(
               'time' => current_time( 'mysql' ),
               'name' => $name,
               'email' => $email,
             )
           );
         }
       }
       add_action( 'init', 'handle_form_submission' );
       ```

     - **Display Submitted Data:**
       - Create a shortcode or admin page to display the data from the custom table.

  4. **Understand Data Sanitization and Security:**

     - **Sanitize Inputs:**
       - Use `sanitize_text_field()`, `sanitize_email()`, etc.
     - **Prevent SQL Injection:**
       - Always prepare queries or use helper methods.
     - **Use Nonces:**
       - Protect against CSRF attacks by using nonces.
     - **Escape Outputs:**
       - Use `esc_html()`, `esc_attr()`, etc., when outputting data.

- **Resources:**
  - [Using $wpdb (Official Docs)](https://developer.wordpress.org/reference/classes/wpdb/)
  - [Database Security Best Practices (Official Docs)](https://developer.wordpress.org/plugins/security/securing-input/)
  - [Nonces for Security (Official Docs)](https://developer.wordpress.org/plugins/security/nonces/)
