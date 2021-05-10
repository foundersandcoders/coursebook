import React from "react";
import PriceFilter from "./components/PriceFilter";
import DishList from "./components/DishList";

function App() {
  const [min, setMin] = React.useState(0.5);
  const [max, setMax] = React.useState(9);
  return (
    <main>
      <section className="filters">
        <h1>Burger Place</h1>
        <form>
          <PriceFilter min={min} setMin={setMin} max={max} setMax={setMax} />
        </form>
      </section>
      <section className="dishes">
        <h2>Dishes</h2>
        <DishList min={min} max={max} />
      </section>
    </main>
  );
}

export default App;
