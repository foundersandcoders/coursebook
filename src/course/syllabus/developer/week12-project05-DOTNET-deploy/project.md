# .NET

Your task this week is to deploy and test the library app you have completed in the previous two weeks.

## Spike

Before you start you need to create a testing and deployment plan. We would like you to plan a testing strategy that will have broad coverage of your project. The tools we would like you to use to achieve this can include Cypress, Postman and the Node built in testing library.

We would also like you to deploy this project using an EC2 instance for you server and a S3 bucket to serve your static files using CloudFront. You should also utilise Github actions to allow you to automatically deploy changes on merges to your main branch.

### Questions to consider

- What parts of the application logic are the most critical to cover with unit tests?
- How will you mock external dependencies (like databases or APIs) during unit testing?
- What are the key user journeys and flows within the application that must be covered by end-to-end tests?
- Where will the code that represents your infrastructure live and how will it be organised?
- How will you manage configuration variables for different environments (development, staging, production)?
- What are the different AWS products you will need to configure to make your deployment successful?

## Acceptance Criteria

- [ ] Comprehensive Test coverage including unit, integration and end-to-end tests covering critical application logic and user flows.
- [ ] Successful deployment on AWS.
- [ ] Documentation clearly outlines setup, deployment, and usage instructions, including API endpoints and environmental requirements.

### Stretch

- [ ] GitHub Actions CI setup to automatically re-deploy when you push to main.

---

# PHP

### **Deployment and Advanced Topics**

#### **Monday: Exploring Deployment Options**

- **Objectives:**

  - Learn about standard WordPress hosting solutions.
  - Compare AWS with managed WordPress hosting providers.

- **Activities:**

  1. **Research Hosting Providers:**

     - **Managed WordPress Hosts:**

       - **SiteGround:**

         - Visit [SiteGround WordPress Hosting](https://www.siteground.com/wordpress-hosting.htm).
         - Note features like WordPress-specific optimizations, staging environments, and support.

       - **Bluehost:**

         - Visit [Bluehost WordPress Hosting](https://www.bluehost.com/wordpress).
         - Check for one-click WordPress installs, free domain, and SSL certificate.

       - **WP Engine:**

         - Visit [WP Engine](https://wpengine.com/).
         - Explore managed hosting features like advanced security, global CDN, and development environments.

     - **Features to Consider:**

       - **Performance Optimization:**

         - Server configurations.
         - Use of caching technologies.
         - CDN availability.

       - **Security Features:**

         - SSL certificates.
         - Malware scanning.
         - Firewall protection.

       - **Customer Support:**

         - Availability of 24/7 support.
         - Support channels (chat, phone, email).

       - **Pricing Plans:**

         - Monthly vs. annual pricing.
         - Introductory offers and renewal rates.

  2. **Understand Benefits of Managed Hosting:**

     - **Ease of Use:**

       - Simplified setup processes.
       - Pre-configured WordPress environments.

     - **Performance:**

       - Servers optimized specifically for WordPress.
       - Built-in caching and performance enhancements.

     - **Security:**

       - Regular security updates.
       - Proactive monitoring for vulnerabilities.

  3. **Compare with AWS:**

     - **AWS Flexibility:**

       - Ability to customize server environments.
       - Scalability options.

     - **Complexity:**

       - Requires knowledge of server management.
       - Setup can be more time-consuming.

     - **Cost Considerations:**

       - Potentially lower costs at scale.
       - Pay-as-you-go pricing model.

  4. **Decide on Hosting Solution:**

     - **Factors to Consider:**

       - **Learning Objectives:**

         - Do you want to learn server management alongside WordPress?

       - **Budget Constraints:**

         - What is the acceptable cost per month/year?

       - **Time Available for Setup:**

         - Is there time to manage servers, or is a managed solution preferable?

     - **Make a Decision:**

       - Choose the hosting provider that best fits your project needs.

- **Resources:**

  - [WordPress Hosting Options (WPBeginner)](https://www.wpbeginner.com/wordpress-hosting/)
  - [Deploying WordPress on AWS (AWS Docs)](https://docs.aws.amazon.com/getting-started/latest/wordpress/wordpress-intro.html)
  - [Best Managed WordPress Hosting Providers](https://wordpress.org/hosting/)

---

#### **Tuesday: Preparing for Deployment**

- **Objectives:**

  - Set up the chosen hosting environment.
  - Migrate the local WordPress site to the hosting server.

- **Activities:**

  1. **Set Up Hosting Environment:**

     - **Sign Up for Hosting:**

       - Follow the sign-up process for your chosen hosting provider.
       - Note down important details like login credentials, server IP, and nameservers.

     - **Set Up Domain (if applicable):**

       - **Register a Domain:**

         - If you need a new domain, register one through your hosting provider or a domain registrar like [Namecheap](https://www.namecheap.com/).

       - **Update Nameservers:**

         - Point your domain to your hosting provider's nameservers.

  2. **Export Local Database:**

     - **Use `phpMyAdmin`:**

       - Access `phpMyAdmin` via `http://localhost/phpmyadmin/`.
       - Select your WordPress database (e.g., `wordpress_db`).
       - Click on the `Export` tab.
       - Choose the `Quick` export method and format as SQL.
       - Click `Go` to download the database export file.

  3. **Import Database to Server:**

     - **Access Server's `phpMyAdmin`:**

       - Log in to your hosting account's control panel (e.g., cPanel).
       - Open `phpMyAdmin` from the control panel.
       - Create a new database (e.g., `yourusername_wpdb`).
       - Create a new database user and assign it to the database with all privileges.
       - Select the new database.
       - Click on the `Import` tab.
       - Choose the SQL file exported earlier and click `Go` to import.

  4. **Upload WordPress Files:**

     - **Use FTP Client (e.g., FileZilla):**

       - **Install FileZilla:** If not already installed, download from [FileZilla](https://filezilla-project.org/).
       - **Connect to the Server:**

         - Host: Your domain or server IP.
         - Username: Your FTP username.
         - Password: Your FTP password.
         - Port: Usually 21.

       - **Upload Files:**

         - Navigate to the `public_html` or `www` directory on the server.
         - Upload all files and folders from your local WordPress directory.

  5. **Configure `wp-config.php`:**

     - **Update Database Credentials:**

       - Open `wp-config.php` in a text editor.
       - Update the following lines with your server database credentials:

         ```php
         define('DB_NAME', 'yourusername_wpdb');
         define('DB_USER', 'your_db_username');
         define('DB_PASSWORD', 'your_db_password');
         define('DB_HOST', 'localhost'); // Often 'localhost', check with your host
         ```

     - **Update Site URLs:**

       - Add the following lines to temporarily define site URLs:

         ```php
         define('WP_HOME','http://yourdomain.com');
         define('WP_SITEURL','http://yourdomain.com');
         ```

  6. **Test the Site:**

     - **Access the Site via Browser:**

       - Navigate to `http://yourdomain.com`.
       - Check if the site loads correctly.

     - **Troubleshoot Issues:**

       - **Common Issues:**

         - Database connection errors.
         - Missing files or permissions errors.

       - **Solutions:**

         - Double-check database credentials in `wp-config.php`.
         - Ensure all files are uploaded.
         - Check file permissions (usually folders 755, files 644).

- **Resources:**

  - [Migrating WordPress Sites (Official Docs)](https://wordpress.org/support/article/moving-wordpress/)
  - [File Transfer via FTP (FileZilla Guide)](https://wiki.filezilla-project.org/Using)
  - [Editing wp-config.php (Official Docs)](https://wordpress.org/support/article/editing-wp-config-php/)

---

#### **Wednesday: Securing and Optimizing the Site**

- **Objectives:**

  - Implement security best practices.
  - Optimize the site's performance.

- **Activities:**

  1. **Install SSL Certificate:**

     - **Use Let's Encrypt (if supported):**

       - **Access Control Panel:**

         - Go to your hosting control panel.

       - **Find SSL/TLS Settings:**

         - Locate the SSL/TLS or Let's Encrypt option.

       - **Install SSL Certificate:**

         - Follow the prompts to install a free SSL certificate for your domain.

     - **Force HTTPS:**

       - **Update `.htaccess` File:**

         - Add the following code at the top of your `.htaccess` file to redirect all traffic to HTTPS:

           ```apacheconf
           RewriteEngine On
           RewriteCond %{SERVER_PORT} 80
           RewriteRule ^(.*)$ https://www.yourdomain.com/$1 [R,L]
           ```

       - **Update WordPress Settings:**

         - In the WordPress admin dashboard, go to `Settings > General`.
         - Update `WordPress Address (URL)` and `Site Address (URL)` to use `https://`.

  2. **Set Up Security Plugins:**

     - **Install Wordfence Security Plugin:**

       - In the WordPress admin dashboard, go to `Plugins > Add New`.
       - Search for "Wordfence Security".
       - Install and activate the plugin.

     - **Configure Wordfence:**

       - Follow the setup wizard.
       - Enable firewall and scan options.
       - Configure login security settings.

  3. **Implement Caching for Performance:**

     - **Install WP Super Cache Plugin:**

       - Go to `Plugins > Add New`.
       - Search for "WP Super Cache".
       - Install and activate the plugin.

     - **Configure Caching Options:**

       - Go to `Settings > WP Super Cache`.
       - Enable Caching.
       - Choose `Simple` caching method.

     - **Advanced Settings (Optional):**

       - Configure CDN support if using a CDN.
       - Enable compression.

  4. **Optimize Images and Assets:**

     - **Install Smush Image Compression Plugin:**

       - Go to `Plugins > Add New`.
       - Search for "Smush".
       - Install and activate the plugin.

     - **Bulk Optimize Images:**

       - Go to `Media > Bulk Smush`.
       - Optimize existing images.

     - **Enable Automatic Optimization:**

       - Configure settings to automatically optimize images on upload.

     - **Minify CSS and JavaScript with Autoptimize:**

       - Install and activate the "Autoptimize" plugin.
       - Go to `Settings > Autoptimize`.
       - Enable options to optimize HTML, JavaScript, and CSS.

  5. **Check Site Performance:**

     - **Use GTmetrix:**

       - Visit [GTmetrix](https://gtmetrix.com/).
       - Enter your site URL and analyze.

     - **Use Google PageSpeed Insights:**

       - Visit [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/).
       - Enter your site URL and analyze.

     - **Review Recommendations:**

       - Identify areas for improvement.
       - Implement suggestions as feasible.

- **Resources:**

  - [WordPress Security Guide (Wordfence Blog)](https://www.wordfence.com/learn/)
  - [SSL for WordPress (Let’s Encrypt Guide)](https://letsencrypt.org/getting-started/)
  - [Caching and Performance (Official Docs)](https://developer.wordpress.org/advanced-performance/)

---

#### **Thursday: Final Adjustments and Presentation**

- **Objectives:**

  - Finalize the deployment of the WordPress site.
  - Prepare and deliver the final 20-minute presentation.
  - Allocate time for presentation preparation.
  - Engage in normal development activities.

- **Activities:**

  1. **Morning Development:**

     - **Finalize Deployment:**

       - **Double-Check Functionality:**

         - Test all site features, including custom theme and plugin functionalities.

       - **Fix Any Remaining Issues:**

         - Address any bugs or errors found during testing.

     - **Perform Final Testing:**

       - **Cross-Browser Testing:**

         - Test the site on multiple browsers (Chrome, Firefox, Edge, Safari).

       - **Mobile Responsiveness:**

         - Test the site on mobile devices or use browser developer tools.

  2. **Presentation Preparation (1 hour):**

     - **Summarize Project Journey:**

       - Outline the project's objectives, progress, and outcomes.

     - **Prepare Presentation Materials:**

       - Create slides highlighting key features.
       - Include screenshots and code snippets where appropriate.
       - Prepare a live demo of the deployed site.

     - **Rehearse:**

       - Practice the presentation to ensure it fits within the 20-minute time limit.

  3. **Deliver the Presentation (20 minutes):**

     - **Presentation Structure:**

       - **Introduction:**

         - Briefly introduce yourself and the project.

       - **Project Overview:**

         - Discuss the project's goals and scope.

       - **Demonstration:**

         - Showcase the live site.
         - Navigate through key features.
         - Highlight custom theme and plugin functionalities.

       - **Technical Deep-Dive:**

         - Explain complex components.
         - Show relevant code snippets.
         - Discuss challenges and how you overcame them.

       - **Conclusion:**

         - Summarize accomplishments.
         - Mention possible future improvements.

     - **Engage with the Audience:**

       - Invite questions and feedback.

  4. **Afternoon Development:**

     - **Implement Feedback:**

       - Address any immediate feedback from the presentation.

     - **Begin Project Documentation:**

       - Start compiling user guides and technical documentation.

- **Resources:**

  - [Tips for Effective Technical Presentations](https://www.toptal.com/designers/presentation/presentation-tips)
  - [Live Demo Best Practices](https://stackoverflow.blog/2017/03/30/a-practical-guide-to-live-demos/)

---

### **Additional Learning Opportunities and Resources**

- **Advanced PHP Concepts:**

  1. **Learn Object-Oriented Programming (OOP):**

     - **Implement Classes and Objects in Your Plugin:**

       - Refactor parts of your plugin to use classes.

       - **Example Class Structure:**

         ```php
         <?php
         class Event_Manager {
           public function __construct() {
             add_action( 'init', array( $this, 'register_custom_post_type' ) );
           }

           public function register_custom_post_type() {
             // Registration code here
           }

           // Additional methods
         }

         $event_manager = new Event_Manager();
         ?>
         ```

     - **Benefits of OOP:**

       - Encapsulation of functionality.
       - Easier maintenance and scalability.

     - **Resources:**

       - [PHP OOP Concepts](https://www.php.net/manual/en/language.oop5.php)

  2. **Use Namespaces and Autoloading:**

     - **Organize Code Using Namespaces:**

       - Add namespaces to your classes.

         ```php
         <?php
         namespace MyPlugin;

         class Event_Manager {
           // Class code
         }
         ?>
         ```

     - **Implement PSR-4 Autoloading:**

       - Use Composer for autoloading classes.

         - **Install Composer:**

           - Download from [getcomposer.org](https://getcomposer.org/download/).

         - **Create `composer.json`:**

           ```json
           {
             "autoload": {
               "psr-4": {
                 "MyPlugin\\": "src/"
               }
             }
           }
           ```

         - **Run Composer Dump-Autoload:**

           ```bash
           composer dump-autoload
           ```

         - **Include Autoloader in Plugin:**

           ```php
           require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
           ```

     - **Resources:**

       - [Composer Autoloading](https://getcomposer.org/doc/01-basic-usage.md#autoloading)
       - [Namespaces in PHP](https://www.php.net/manual/en/language.namespaces.php)

- **Security Best Practices:**

  - **Deep Dive into WordPress Security:**

    - **Further Hardening WordPress:**

      - Change default table prefixes.
      - Disable file editing from the admin dashboard.

        ```php
        // Add to wp-config.php
        define('DISALLOW_FILE_EDIT', true);
        ```

      - Limit login attempts.

    - **Stay Updated:**

      - Regularly update WordPress core, themes, and plugins.

    - **Resources:**

      - [Hardening WordPress (Official Docs)](https://wordpress.org/support/article/hardening-wordpress/)
      - [WordPress Security Whitepaper](https://wordpress.org/about/security/)
