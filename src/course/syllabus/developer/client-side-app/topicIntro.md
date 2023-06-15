# **Full-Stack Apps**

Web applications are an amalgamation of data and markup. Let's consider a personal landing page as an example. The data comprises the specific information about you, while the markup is the HTML that encapsulates this information.

There are generally two types of data we work with - static and dynamic. Static data doesn't undergo much change, enabling you to craft the HTML in advance. The server, yours or a third-party service like Netlify's, just responds with the pre-generated static **`.html`** file when a request is made.

On the contrary, dynamic data changes with each request. With such data, you are required to generate each page on demand. This page generation can occur either on the server or the client.

Generating pages on the server is usually simpler and safer, but doing it on the client allows for more dynamic interaction. What if there was a way to do both, within the same application?

## **Enter Next.js**

Next.js is a powerful framework for building websites using React. React, although an excellent library for building user interfaces, doesn't provide many necessities for websites such as routing, server-rendering, and data fetching. Next.js steps in to fill these gaps, creating "isomorphic" JavaScript applications that render both on the server and the client.

This dual-rendering process works as follows: **initially, the page load is server-rendered HTML. Once the JavaScript loads, the whole application runs client-side.** This balance is a compromise between initial performance (showing HTML quickly) and later interactivity on the client side.

### How it works

To use Next.js, you create React components in a **`pages/`** directory. Here's an example:

```
// pages/Index.js

function Index() {
  return <h1>Hello world</h1>;
}

export default Index;
```

Next.js's Node server creates a route for this component:

```
server.get("/", (req, res) => {
  const component = ReactServer.renderToString(<Index />);
  const html = `
    <div id="root">${component}</div>
    <script src="client-bundle.js"></script>
  `;
  res.send(html);
});
```

The server initially renders your application to get the HTML. Then it renders your app again on the client to "hydrate" it. The hydration process instructs React to connect to existing DOM nodes.

```
// client-bundle.js

ReactDOM.hydrate(<Index />, document.querySelector("#root"));
```

Before hydration happens, the user can still see the HTML. Once hydration finishes, you have a fully functioning client-side app.

### **Backend stuff**

In addition to managing front-end rendering, Next.js also supports "API routes". These are routes that don't render React components but return JSON instead.

To implement this, you create files inside **`pages/api/`**. These files are used as handlers for the matching route. For instance:

```
// pages/api/user.js

function user(req, res) {
  res.status(200).json({ name: "John Doe" });
}

export default user;
```

This enables you to build an API route that fetches JSON data, which is simpler than having to create and deploy a whole separate server.

In conclusion, Next.js presents an efficient way to develop full-stack applications, providing out-of-the-box solutions for some of the most common web development needs, all while leveraging the power of React. It offers an excellent bridge between server-side rendering for optimal performance and client-side rendering for dynamic interactivity.
