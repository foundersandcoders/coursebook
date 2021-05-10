import React from "react";
// import dishes from "../data";

// const categories = [
//   "all",
//   "burger",
//   "hot dog",
//   "sandwich",
//   "fries",
//   "topping",
//   "drink",
//   "extra",
// ];

function App() {
  return (
    <main>
      <section className="filters">
        <h1>Burger Place</h1>
        <form>Inputs go here</form>
      </section>
      <section className="dishes">
        <h2>Dishes</h2>
        <ul className="grid">
          <li className="card">dishes go here</li>
        </ul>
      </section>
    </main>
  );
}

export default App;
