import React from "react";
import dishes from "../data";

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
          {dishes.length ? (
            dishes.map(dish => (
              <li key={dish.id} className="card">
                <h3>{dish.name}</h3>
                {dish.description && <p>{dish.description}</p>}
                <div>£{dish.price.toFixed(2)}</div>
              </li>
            ))
          ) : (
            <li className="card">No results found</li>
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;
