import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/read")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlants(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <ul>
        {plants.map((plant) => (
          <li key={plant.plant_id}>
            <h1>{plant.plant_name}</h1> - <h3>{plant.plant_species}</h3> <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
