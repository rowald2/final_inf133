import React from 'react';
import './NutrientResults.css';

export default function NutrientResults(props){

  return (
    <div className='nutrition-background'>
      <div className='nutrition-box'>
        <h2><u>Calories: {props.calories}</u></h2>
        <h3>Proteins: {props.proteins}</h3>
        <h3>Fats: {props.fats}</h3>
        <h3>Carbs: {props.carbs}</h3>
      </div>
    </div>
  )
}