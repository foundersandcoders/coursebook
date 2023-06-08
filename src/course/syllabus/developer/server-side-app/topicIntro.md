# **Single-Page Applications & React**

This document provides an in-depth exploration of single-page applications (SPAs) and their role in modern web development. A particular focus is placed on the React framework, which has significantly influenced the way SPAs are developed.

## **Brief history of web dev**

The history of web development is marked by a shift from server-side rendering to client-side rendering, where much of the application logic now runs in the browser, leading to the development of SPAs.

### **Server-Side Rendering (SSR)**

Historically, web development relied heavily on server-side rendering. In this model, when the browser requested a page, the server processed that request and responded with HTML for the browser to render. The browser acted as a "thin client," meaning it simply displayed what the server gave it and handled minimal logic.

Client-side JavaScript was used to add a layer of interactivity (like modals) to the page, but the majority of the heavy lifting was done on the server side, with **HTML serving as the source of truth\***.\*

**Advantages of SSR:**

1. **Simplicity**: Browsers automatically handle a plethora of tasks, reducing the need for developers to implement complex features via JS.

   Imagine implementing links using JS. It’s easy to miss but native elements like `<a>` and `<form>` handle a *lot* of complexity.

2. **Language Flexibility**: Server-side code can be written in any language, including PHP, Ruby, Python, Java, etc., providing a broad selection for developers.
3. **Hardware Power**: Web servers typically run on powerful dedicated hardware, while client-side code runs on the user's device, which can often be an underpowered mobile phone.
4. **Security**: Server code is hidden from the user, preventing access to sensitive data and secrets, and ensuring a higher level of security compared to client-side code.

**Disadvantages of SSR:**

1. **Perceived Performance**: Every interaction with the site requires a request to the server and back. Full page loads can make the site feel slower to users.
2. **Limited Interactivity**: Building dynamic, interactive applications that can compete with native applications is more challenging.
3. **Server Maintenance**: Deploying, securing, and maintaining a server can be expensive and complex, especially for popular sites.
4. **Separate Developer Skill Sets**: Historically, backend and frontend development were separate skill sets, often requiring two teams to write in two different languages, which can be inefficient and costly.

## **The Emergence of Single-Page Applications (SPAs)**

With SPAs, all application logic runs in the browser, and only one HTML page (**`index.html`**) is requested. Following this, all routing and templating occurs in the browser via JavaScript.

While database access is still server-side (for security reasons), all application logic and templating occur in the browser. The application fetches JSON data from servers (either third-party or owned) and uses this data to render dynamic Document Object Model (DOM) content. In this model, **JSON becomes the source of truth**.

**Advantages of SPAs:**

1. **Perceived Performance**: SPAs don't require full page reloads for small changes, and fetching JSON to update a section can feel faster to users.
2. **Interactivity**: More dynamic interactions are possible with SPAs. Features such as list filtering, element deletion, and animated transitions become easier to implement.
3. **Reduced Server Needs**: If an SPA uses third-party APIs, it doesn't need a server of its own. Free static hosts like Netlify can host the HTML, CSS, and JavaScript files, bypassing the complexities and expenses of server management.
4. **Full Stack JavaScript**: The same developers can write both the frontend and backend code in JavaScript, increasing efficiency.

**Disadvantages of SPAs:**

1. **Complexity**: Building non-trivial applications in client-side JavaScript can be challenging, particularly when managing the ongoing state of the application.
2. **Mandatory JavaScript**: SPAs can only run JavaScript in the browser, which isn't necessarily the best language for certain tasks (e.g., precision currency calculations).

   ```bash
   0.1 + 0.2 === 0.30000000000000004; // true
   ```

3. **Hardware Limitations**: SPAs run on the user's device (often a £100 Android phone with a CPU from 5 years ago), which may not have the processing power of a dedicated web server. JavaScript can be slow to parse and execute on older devices.
4. **Security**: All code executes in the browser, which can't hide API keys or validate user input, necessitating a server to ensure security.
5. **Rendering Delay**: SPAs initially display a blank page until the JavaScript loads, parses, and executes. JavaScript is the "slowest resource per byte," meaning it takes longer to run 1KB of JavaScript than render 1KB of HTML.
6. **Large Downloads**: SPAs require users to download all the application's code, offloading processing from the company servers to the user's device.

## **The Role of Frontend Frameworks like React**

Frameworks such as React help manage the complexity of building big applications by providing a shared structure for developers and handling lower-level DOM updates.

**Advantages of Frontend Frameworks:**

1. **Shared Understanding**: A framework provides patterns for structuring code within a team and often has extensive documentation available online.
2. **User Experience**: Good frameworks facilitate building cool stuff and can empower newer developers.
3. **Developer Experience**: Frameworks can make building complex apps more enjoyable and often come with built-in features that developers want.

**Disadvantages of Frontend Frameworks:**

1. **Performance**: Frameworks are additional code that must load before your own. They can also encourage bad habits leading to bloated apps, e.g. just \*\*\*\*`npm install do-the-thing`.
2. **Lock-in**: React apps, for instance, can't usually use libraries written for Angular. An organization tends to commit to one technology.
3. **Limited Control**: Frameworks like React are built for specific uses (in React's case, Facebook). They might add features you don't need or refuse to add features you want.

## **Why Use React?**

React, a JavaScript library for building user interfaces, primarily for SPAs, offers numerous benefits for developers.

1. **Declarative UI**: Instead of instructing the browser on each step to render an element, developers can describe it using JSX (JavaScript XML), just like HTML. This approach includes event listeners, making interactions more declarative.

   ```jsx
   // imperative
   function Box() {
     const div = document.createElement("div");
     div.classList.add("box");
     div.append("Hello world");
     return div;
   }

   // declarative
   function Box() {
     return <div className="box">Hello world</div>;
   }

   // declarative event listeners
   return <button onClick={() => console.log("Clicked!")}>Click me</button>;
   ```

2. **JSX Closeness to HTML**: JSX, an HTML-like syntax used with React, allows developers to write HTML structures inside JavaScript.

   ```jsx
   // standard JS
   function DateInput() {
     return h("input", { id: "dob", type: "date", placeholder: "dd/mm/yyyy" });
   }

   // JSX
   function DateInput() {
     return <input id="dob" type="date" placeholder="dd/mm/yyyy" />;
   }
   ```

3. **Component Model**: React encourages dividing your app into pieces or "components," each with its markup, styling, and behaviour, providing a logical mental model and encouraging code reuse.

   ```jsx
   function App() {
     return (
       <Form>
         <Field>
           <Label>Name</Label>
           <TextInput />
           <Error />
         </Field>
         <Field>
           <Label>Date of birth</Label>
           <DateInput />
           <Error />
         </Field>
       </Form>
     );
   }
   ```

4. **"Just JavaScript"**: React doesn't require a special templating language. Developers use JavaScript conditionals, variables, and loops to render markup.

   ```jsx
   const posts = ["blah", "other post", "..."];
   return <div>There are {posts.length || 0} blog posts.</div>;
   ```

5. **"UI as a Function of State"**: React follows the principle of "UI as a function of state," meaning for any given state, the rendered DOM should always be the same. Developers only need to update the state, and React ensures the UI stays in sync. This approach simplifies the management of the UI based on state changes and allows React to manage the underlying DOM updates.

   By focusing on "UI as a function of state," React upholds the idea of "pure functions," where the output is always the same for the given input, and no other part of the system is affected. Thus, the UI is directly derived from the state of the application, simplifying the correlation between the state and what the user sees.

   ```jsx
   // pure functions
   // if add is “pure” we can be sure what x is every time we call it.
   // we also know nothing else will be affected.

   let x = add(1, 2);

   // apply the same idea to UI
   // We can know exactly what the DOM is for any given app state.

   let state = { name: "oli", basket: [...] }
   let dom = app(state);
   // OR `ui = fn(state)`

   // UI is a function of your state
   return <button>The count is: {count}</button>;

   // Instead of:
   // When this thing happens, find this element and change this property to that value...

   // we have:
   // Given the current state, this is what the UI should be

   // and React just makes it happen.
   ```

By embracing these features, React provides a compelling case for developers seeking to build robust, interactive web applications that need to manage complex state changes and ensure a high degree of interactivity. React helps abstract away many complexities, allowing developers to focus on building the best possible user interfaces.
