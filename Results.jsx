import React from "react";
import "./Results.css";

export default function Results(props) {
  return (
    <div className="result-background">
      <div className="result-box">
        <h2><u>{props.name}</u></h2>
        <h3>Rating: {props.rating}</h3>
        {console.log(props.img)}
  
        <img src={props.img} alt="no image" />
        <h3>Distance: {props.distance} miles</h3>
        <h3>{props.street} {props.city}, CA {props.zipcode}</h3>
      </div>
    </div>
  );
}
