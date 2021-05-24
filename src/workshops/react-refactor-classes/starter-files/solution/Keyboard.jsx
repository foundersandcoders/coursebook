import React from "react";

function Keyboard() {
  const [key, setKey] = React.useState("");
  React.useEffect(() => {
    const handleKeyDown = (event) => setKey(event.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return <div>{key || "Press any key"}</div>;
}

export default Keyboard;
