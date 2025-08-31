import React, { useState, useEffect } from "react";
import "./Meal.css";

const Meal = () => {
  const [Mealdata, setMealdata] = useState([]);
  const [area, setarea] = useState("indian");
  const [search, setsearch] = useState("");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      const data = await api.json();
      console.log(data);
      setMealdata(data.meals);
      setsearch("");
    };
    fetchDataFromAPI();
  }, [area]);

  const submithandler = async (e) => {
    e.preventDefault();
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await api.json();
    console.log(data);
    setMealdata(data.meals);
  };

  return (
    <>
      {/* 🔹 Header with classes */}
      <div className="header-bar">
        <span className="header-text">🍴 FoodiesHome</span>
        <img src="/foodieshome.png" alt="logo" className="header-logo" />
      </div>

      <div className="mx-auto text-center mt-3">
        <button
          type="button fw-bold"
          onClick={() => setarea("Indian")}
          className="btn btn-outline-primary mx-3 "
        >
          Indian
        </button>
        <button
          type="button fw-bold"
          onClick={() => setarea("Canadian")}
          className="btn btn-outline-secondary mx-3"
        >
          Canadian
        </button>
        <button
          type="button fw-bold"
          onClick={() => setarea("American")}
          className="btn btn-outline-success mx-3"
        >
          American
        </button>
        <button
          type="button fw-bold"
          onClick={() => setarea("Thai")}
          className="btn btn-outline-danger mx-3"
        >
          Thai
        </button>
        <button
          type="button fw-bold"
          onClick={() => setarea("British")}
          className="btn btn-outline-warning mx-3"
        >
          British
        </button>
        <button
          type="button fw-bold"
          onClick={() => setarea("Russian")}
          className="btn btn-outline-info mx-3"
        >
          Russian
        </button>
      </div>

      <form className="mx-auto text-center mt-3">
        <input
          onChange={(e) => setsearch(e.target.value)}
          type="text"
          className="me-2"
        />
        <button
          onClick={submithandler}
          class="btn btn-outline-success "
          type="submit"
        >
          Search
        </button>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {Mealdata.map((data) => (
          <div key={data.idMeal} style={{ textAlign: "center" }}>
            <img
              src={data.strMealThumb}
              alt={data.strMeal}
              style={{
                width: "220px",
                borderRadius: "10px",
                margin: "15px",
              }}
            />
            <h5 className="text-light text-center">{data.strMeal}</h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default Meal;
