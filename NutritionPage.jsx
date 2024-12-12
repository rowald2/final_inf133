import React from "react";
import NutrientResults from "./NutrientResults";

export default function NutritionPage() {
  const API_KEY = "7bb6732f4966407fa3eb2bf30ae86c16";
  const [dish_name, setdish_name] = React.useState("");
  const [calories, setCalories] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [fats, setFats] = React.useState("");
  const API_URL = `https://api.spoonacular.com/recipes//guessNutrition?title=${dish_name}&&apiKey=${API_KEY}`;

  const [submitted, setsubmitted ] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    // add api request here
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setsubmitted(true);
        setCalories(data.calories.value);
        setProtein(data.protein.value);
        setCarbs(data.carbs.value);
        setFats(data.fat.value);
      });
  };

  return (
    <>
      <div>
        <h1>Nutrition Page</h1>
        <div className="search-page">
          <div className="search-box">
            <h2>Dish Nutrition</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={dish_name}
                placeholder="Enter the dish"
                onChange={(e) => setdish_name(e.target.value)}
              />
              <input className="button" type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>

      <div className="results">
        <ul>
          {submitted &&
            <NutrientResults
              calories={calories}
              proteins={protein}
              fats={fats}
              carbs={carbs}
            />
          }
        </ul>
      </div>
    </>
  );
}
