import React from "react";
import { getPokemon } from "./utils";

function Pokemon({ name }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    getPokemon(name).then((data) => {
      setData(data);
    });
  }, [name]);
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <h2>{data.name}</h2>
      <img
        src={data.sprites.front_default}
        alt={`${data.name} default sprite`}
      />
    </div>
  );
}

function getPokemon(name) {
  return window
    .fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => {
      if (!res.ok) throw new Error("HTTP error");
      return res;
    })
    .then((res) => res.json());
}

export default Pokemon;
