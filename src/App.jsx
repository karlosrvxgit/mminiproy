
import React, { useEffect, useState } from "react";
import "./App.css";
import "./Card.css";
import Card from "./Card.jsx";
import logo from "./img/logo.png";
import Navbar from "./Navbar";
import "./Navbar.css"

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");

  const getData = async () => {
    try {
      const res = await fetch("stays.json");
      // const res = await fetch("http://localhost:3000/path/to/stays.json");

      const resJson = await res.json();
      setData(resJson);
      setFilteredData(resJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCityFilter = (event) => {
    const cityName = event.target.value.toLowerCase();
    setCityFilter(cityName);

    const filtered = data.filter((stay) =>
      stay.city.toLowerCase().includes(cityName)
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <nav id="search">
        <div id="img-logo">
          <img src={logo} alt="Logo" width="96" />
        </div>
      </nav>

      <Navbar cityFilter={cityFilter} handleCityFilter={handleCityFilter} />

      <div id="finland">
        <div className="stays">
          <span>Stays in Finland</span>
        </div>
        <div className="stays12">
          <span>{filteredData.length}+ Stays</span>
        </div>
      </div>

      <div className="cardcontainer">
        {filteredData.map((el, index) => (
          <Card props={el} key={index} />
        ))}
      </div>
    </>
  );
}


