# .NET

Your task this week is to continue building the project from last week but to try and add some .NET tests and more broadly to use dependency injection.

## Spike

Before you start think what are your dependencies. Which of these are tightly tied to other classes in a way that will slow development or make testing hard. If you want to replace this with dependency injection think what will the interface look like.

### Questions to consider

- What do you want the structure of your project to look like and how should the solution file be configured to allow that?
- Where do you want to use dependency injections in my code?
- How will you test the functionality of the API?
- Where you are using interfaces what keys and methods will the interface need to look for?

### Acceptance Criteria

- [ ] Tests for all the functions of your APIs

- [ ] Tests run without making changes to the actual database

- [ ] Code is efficiently organized and has been refactored

### Stretch criteria

- [ ] Add verification to your code and test its functionality

---

# PHP

### **Building the Custom Plugin and Theme Integration**

#### **Monday: Planning the Plugin Functionality**

- **Objectives:**

  - Define the plugin's purpose, features, and data requirements.
  - Design the database schema if needed.
  - Set up version control.

- **Activities:**

  1. **Brainstorm Plugin Ideas:**

     - **Possible Ideas:**
       - Event Manager with custom event posts.
       - Testimonials plugin with submission form.
       - Simple CRM for managing contacts.

  2. **Outline Main Features:**

     - **User Interactions:**
       - Front-end forms for data submission.
       - Admin pages for data management.
     - **Functionality:**
       - CRUD operations (Create, Read, Update, Delete).
       - Notifications or email integration.

  3. **Design Database Schema:**

     - **Identify Data Entities:**
       - Determine what data needs to be stored.
     - **Sketch Tables and Relationships:**
       - Use diagrams or tools like [Draw.io](https://app.diagrams.net/).

  4. **Set Up Version Control:**

     - **Initialize Git Repository:**
       - Run `git init` in your plugin directory.
     - **Create a Remote Repository:**
       - Use [GitHub](https://github.com/), [GitLab](https://gitlab.com/), or [Bitbucket](https://bitbucket.org/).
     - **Commit and Push Changes:**
       - Stage files with `git add .`, commit with `git commit -m "Initial commit"`, and push to remote.

- **Resources:**
  - [Guide to Custom Post Types (Official Docs)](https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/)
  - [Git Basics (Git-SCM)](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
  - [Database Schema Best Practices (DigitalOcean)](https://www.digitalocean.com/community/tutorial_series/databases)

---

#### **Tuesday: Developing the Plugin Backend**

- **Objectives:**

  - Start coding the core functionality of the plugin.
  - Create custom post types and taxonomies.
  - Build admin menus and settings pages.

- **Activities:**

  1. **Register Custom Post Types (CPT):**

     - **Add Code in Plugin File:**
       ```php
       function create_custom_post_type() {
         $labels = array(
           'name' => __( 'Events' ),
           'singular_name' => __( 'Event' ),
           'add_new' => __( 'Add New Event' ),
           'add_new_item' => __( 'Add New Event' ),
           'edit_item' => __( 'Edit Event' ),
           'new_item' => __( 'New Event' ),
           'all_items' => __( 'All Events' ),
           'view_item' => __( 'View Event' ),
           'search_items' => __( 'Search Events' ),
           'not_found' => __( 'No events found' ),
           'not_found_in_trash' => __( 'No events found in Trash' ),
           'menu_name' => __( 'Events' )
         );
         $args = array(
           'labels' => $labels,
           'public' => true,
           'has_archive' => true,
           'supports' => array( 'title', 'editor', 'custom-fields', 'thumbnail' ),
           'rewrite' => array( 'slug' => 'events' ),
         );
         register_post_type( 'event', $args );
       }
       add_action( 'init', 'create_custom_post_type' );
       ```

  2. **Add Custom Taxonomies:**

     - **Register Taxonomy:**
       ```php
       function create_event_taxonomies() {
         $labels = array(
           'name' => __( 'Event Types' ),
           'singular_name' => __( 'Event Type' ),
           'search_items' =>  __( 'Search Event Types' ),
           'all_items' => __( 'All Event Types' ),
           'parent_item' => __( 'Parent Event Type' ),
           'parent_item_colon' => __( 'Parent Event Type:' ),
           'edit_item' => __( 'Edit Event Type' ),
           'update_item' => __( 'Update Event Type' ),
           'add_new_item' => __( 'Add New Event Type' ),
           'new_item_name' => __( 'New Event Type Name' ),
           'menu_name' => __( 'Event Types' ),
         );
         $args = array(
           'hierarchical' => true,
           'labels' => $labels,
           'show_ui' => true,
           'show_admin_column' => true,
           'query_var' => true,
           'rewrite' => array( 'slug' => 'event-type' ),
         );
         register_taxonomy( 'event_type', array( 'event' ), $args );
       }
       add_action( 'init', 'create_event_taxonomies', 0 );
       ```

  3. **Build Admin Menus and Settings Pages:**

     - **Add Menu Page:**
       ```php
       function my_plugin_menu() {
         add_menu_page( 'Events Management', 'Events', 'manage_options', 'events', 'events_page', 'dashicons-calendar', 6 );
       }
       add_action( 'admin_menu', 'my_plugin_menu' );
       ```
     - **Create Settings Page Content:**
       ```php
       function events_page() {
         echo '<div class="wrap"><h1>Events Management</h1>';
         // Add settings forms or data display here.
         echo '</div>';
       }
       ```

  4. **Use the WordPress Settings API:**

     - **Register Settings:**
       ```php
       function my_plugin_settings() {
         register_setting( 'my-plugin-settings-group', 'my_option_name' );
       }
       add_action( 'admin_init', 'my_plugin_settings' );
       ```
     - **Create Settings Form:**
       ```php
       function events_page() {
         ?>
         <div class="wrap">
           <h1>Events Management</h1>
           <form method="post" action="options.php">
             <?php settings_fields( 'my-plugin-settings-group' ); ?>
             <?php do_settings_sections( 'my-plugin-settings-group' ); ?>
             <table class="form-table">
               <tr valign="top">
                 <th scope="row">Option Name</th>
                 <td><input type="text" name="my_option_name" value="<?php echo esc_attr( get_option('my_option_name') ); ?>" /></td>
               </tr>
             </table>
             <?php submit_button(); ?>
           </form>
         </div>
         <?php
       }
       ```

- **Resources:**
  - [How to Register Custom Taxonomies (Official Docs)](https://developer.wordpress.org/plugins/taxonomies/working-with-custom-taxonomies/)
  - [Admin Menus and Settings API (Official Docs)](https://developer.wordpress.org/plugins/settings/custom-settings-page/)
  - [Plugin Settings with the WordPress Settings API (Smashing Magazine)](https://www.smashingmagazine.com/2011/10/create-wordpress-plugins-with-the-settings-api/)

---

#### **Wednesday: Enhancing the Plugin with AJAX and APIs**

- **Objectives:**

  - Implement dynamic features using AJAX.
  - Integrate external APIs if applicable.

- **Activities:**

  1. **Implement AJAX in the Plugin:**

     - **Enqueue Scripts:**
       ```php
       function enqueue_plugin_scripts() {
         wp_enqueue_script( 'my-plugin-ajax', plugin_dir_url( __FILE__ ) . 'js/plugin-ajax.js', array('jquery'), null, true );
         wp_localize_script( 'my-plugin-ajax', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
       }
       add_action( 'wp_enqueue_scripts', 'enqueue_plugin_scripts' );
       ```
     - **Create JavaScript File `plugin-ajax.js`:**
       ```javascript
       jQuery(document).ready(function ($) {
         $("#my-button").on("click", function () {
           $.ajax({
             url: ajax_object.ajax_url,
             type: "POST",
             data: {
               action: "my_ajax_action",
               data: "test",
             },
             success: function (response) {
               alert("Response: " + response);
             },
           });
         });
       });
       ```
     - **Handle AJAX Request in PHP:**
       ```php
       function my_ajax_action() {
         $data = $_POST['data'];
         // Process data here.
         echo 'Received: ' . $data;
         wp_die(); // All AJAX handlers should die when finished.
       }
       add_action( 'wp_ajax_my_ajax_action', 'my_ajax_action' );
       add_action( 'wp_ajax_nopriv_my_ajax_action', 'my_ajax_action' );
       ```

  2. **Integrate External APIs (Optional):**

     - **Choose an API:**
       - For example, fetch event data from a public API like Eventbrite.
     - **Make API Requests:**
       - Use `wp_remote_get()` to fetch data.
       ```php
       $response = wp_remote_get( 'https://api.eventbriteapi.com/v3/events/search/?token=YOUR_API_TOKEN' );
       if ( is_array( $response ) && ! is_wp_error( $response ) ) {
         $body = $response['body']; // use the content
         $data = json_decode( $body );
       }
       ```
     - **Display Data on Front-End:**
       - Process and output the data within templates or via shortcodes.

  3. **Continue Integrating TypeScript:**

     - **Use TypeScript for AJAX Calls:**

       - Convert `plugin-ajax.js` to TypeScript and place it in `src/`.

       ```typescript
       import $ from "jquery";

       $(document).ready(function () {
         $("#my-button").on("click", function () {
           $.ajax({
             url: ajax_object.ajax_url,
             type: "POST",
             data: {
               action: "my_ajax_action",
               data: "test",
             },
             success: function (response) {
               alert("Response: " + response);
             },
           });
         });
       });
       ```

     - **Update Build Process:**
       - Ensure Webpack compiles the TypeScript file into JavaScript.
     - **Enqueue the Compiled Script:**
       - Update the script handle and path in your plugin.

- **Resources:**
  - [Using AJAX in Plugins (Official Docs)](https://developer.wordpress.org/plugins/javascript/ajax/)
  - [Fetch API Basics (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  - [Integrating APIs into WordPress (WPBeginner)](https://www.wpbeginner.com/wp-tutorials/how-to-fetch-and-display-external-api-data-in-wordpress/)

---

#### **Thursday: Presentation Preparation and Delivery**

- **Objectives:**

  - Prepare and deliver a 20-minute presentation showcasing the plugin progress.
  - Continue normal development activities.

- **Activities:**

  1. **Morning Development:**

     - **Integrate Plugin with Theme:**
       - Connect plugin functionalities to the custom theme.
     - **Enhance Plugin Features:**
       - Add new features or refine existing ones.
     - **Debug and Test:**
       - Ensure the plugin works seamlessly within the theme.

  2. **Presentation Preparation (1 hour):**

     - **Summarize Plugin Progress:**
       - Outline key functionalities developed.
     - **Prepare Presentation Materials:**
       - Create slides or notes.
       - Set up a live demo.
     - **Rehearse:**
       - Practice delivering the presentation within the time limit.

  3. **Deliver the Presentation (20 minutes):**

     - **Presentation Content:**
       - Introduce your plugin and its purpose.
       - Demonstrate key features and integrations.
       - Discuss challenges faced and solutions implemented.
     - **Engage with the Audience:**
       - Encourage questions and feedback.

  4. **Afternoon Development:**

     - **Implement Feedback:**
       - Incorporate any useful suggestions received during the presentation.
     - **Continue Development:**
       - Proceed with pending tasks.

- **Resources:**
  - [Presentation Skills for Developers](https://www.developer.com/languages/7-presentation-skills-every-developer-needs/)
  - [Demo Preparation Checklist](https://www.softwaretestinghelp.com/how-to-give-software-demo/)

---

#### **Friday: Front-End Integration and Shortcodes**

- **Objectives:**

  - Connect the plugin with the theme.
  - Provide user-facing features using shortcodes and widgets.

- **Activities:**

  1. **Create Shortcodes to Display Plugin Data:**

     - **Display Events List:**
       ```php
       function display_events_shortcode() {
         $args = array(
           'post_type' => 'event',
           'posts_per_page' => -1,
         );
         $events = new WP_Query( $args );
         $output = '<ul>';
         if ( $events->have_posts() ) {
           while ( $events->have_posts() ) {
             $events->the_post();
             $output .= '<li>' . get_the_title() . ' - ' . get_the_date() . '</li>';
           }
         } else {
           $output .= '<li>No events found.</li>';
         }
         $output .= '</ul>';
         wp_reset_postdata();
         return $output;
       }
       add_shortcode( 'events_list', 'display_events_shortcode' );
       ```
     - **Use Shortcode in a Page:**
       - Add `[events_list]` to display the list of events.

  2. **Design Front-End Templates for CPT:**

     - **Create Template Files:**
       - `single-event.php` for individual events.
       - `archive-event.php` for event archives.
     - **Customize Templates:**
       - Use HTML and WordPress functions to display event details.
       - Example for `single-event.php`:
         ```php
         <?php get_header(); ?>
         <div class="event-content">
           <?php
           if ( have_posts() ) :
             while ( have_posts() ) : the_post();
               ?>
               <h1><?php the_title(); ?></h1>
               <div class="event-meta">
                 <p>Date: <?php echo get_post_meta( get_the_ID(), 'event_date', true ); ?></p>
                 <p>Location: <?php echo get_post_meta( get_the_ID(), 'event_location', true ); ?></p>
               </div>
               <div class="event-description">
                 <?php the_content(); ?>
               </div>
               <?php
             endwhile;
           endif;
           ?>
         </div>
         <?php get_footer(); ?>
         ```

  3. **Ensure Responsive Design and Accessibility:**

     - **Use Responsive CSS Frameworks (Optional):**
       - Integrate Bootstrap or Tailwind CSS.
     - **Accessibility Best Practices:**
       - Use semantic HTML.
       - Ensure proper contrast and font sizes.
       - Add `alt` attributes to images.

  4. **Optimize Assets with TypeScript and CSS Preprocessors:**

     - **Set Up SASS (Optional):**
       - Install `node-sass`:
         ```bash
         npm install --save-dev node-sass
         ```
     - **Update Build Process:**
       - Configure Webpack to process SCSS files.
       - Example `webpack.config.js` update:
         ```javascript
         module: {
           rules: [
             // ...existing rules
             {
               test: /\.scss$/,
               use: [
                 'style-loader',
                 'css-loader',
                 'sass-loader'
               ],
             },
           ],
         },
         ```
     - **Organize Styles:**
       - Create SCSS files in `src/styles/`.
     - **Import Styles in TypeScript:**
       ```typescript
       import "./styles/main.scss";
       ```

- **Resources:**
  - [Building Shortcodes (Official Docs)](https://developer.wordpress.org/plugins/shortcodes/basic-shortcodes/)
  - [Creating Widgets for Plugins (Official Docs)](https://developer.wordpress.org/themes/functionality/widgets/)
  - [Responsive Design Basics (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
