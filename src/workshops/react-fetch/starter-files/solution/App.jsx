import React from "react";
import Profile from "./Profile.jsx";

function App() {
  const [name, setName] = React.useState("oliverjam");
  return (
    <main>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setName(event.target.username.value);
        }}
      >
        <input
          type="search"
          aria-label="Search users"
          placeholder="Search users"
          name="username"
        />
      </form>
      <Profile name={name} />
    </main>
  );
}

export default App;
