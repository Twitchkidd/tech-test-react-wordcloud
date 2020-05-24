import React from "react";
import ReactWordcloud from "react-wordcloud";
import { words } from "./data";

function App() {
  console.log(words.length);
  return (
    // <div style={{ width: "300px" }}>
    <div>
      <ReactWordcloud
        words={words}
        options={{
          colors: ["#C1357E", "#675997", "#0655A9"],
        }}
      />
    </div>
  );
}

export default App;
