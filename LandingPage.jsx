import React from "react";
import "./LandingPage.css";
import "./Results";
import Results from "./Results";

export default function LandingPage() {
  const API_KEY = "7bb6732f4966407fa3eb2bf30ae86c16";
  const [location, setLocation] = React.useState("");
  const [restaurants, setRestaurants] = React.useState([]); // State to hold fetched data
  const API_URL = `https://api.spoonacular.com/food/restaurants/search?query=${location}&lat=33.64638427421144&lng=-117.84284267389859&apiKey=${API_KEY}`;

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
        // handle data here
        setRestaurants(data.restaurants.slice(0, 5)); // Limit to 5 result
      });
  };

  return (
    <>
      <div className="search-page">
        <div className="search-box">
          <h2>Find places near you</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={location}
              placeholder="Enter your location"
              onChange={(e) => setLocation(e.target.value)}
            />
            <input className="button" type="submit" value="submit" />
          </form>
        </div>
      </div>

      <div className="results">
        <ul>
          {restaurants.map((restaurant) => (
            <Results
              key={restaurant._id}
              name={restaurant.name}
              img={restaurant.logo_photos[0]}
              rating={restaurant.weighted_rating_value.toFixed(2)}
              distance={restaurant.miles.toFixed(2)}
              street={restaurant.address.street_addr}
              city={restaurant.address.city}
              zipcode={restaurant.address.zipcode}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
