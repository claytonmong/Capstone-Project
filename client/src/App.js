// import React, {useState, useEffect} from 'react'

// function App() {
//   const [data, setData] = useState([{}])

//   useEffect(() => {
//     fetch('/recipes').then(
//       response => response.json()
//     ).then(
//       data => {
//         setData(data)
//         console.log(data)
//       }
//     )
//   }, [])
//   return (
//     <div>
//       {(typeof data.recipes === 'undefined') ? (
//         <p>Loading...</p>
//       ) : (
//         data.recipes.map((member, i ) => (
//           <p key={i}>{member}</p>
//         ))
//       )}
//     </div>
//   )
// }
import {
  Router,
  Switch,
  Route,
  Routes,
  Redirect,
  Link,
} from "react-router-dom";
import Recipe from "./Recipe";
import { useState } from "react";
import Header from "./enter-ingredients-components/Header";
import Ingredients from "./enter-ingredients-components/Ingredients";
import AddIngredient from "./enter-ingredients-components/AddIngredient";
import SampleRecipeData from "./sample-data/SampleRecipeData";
import RecipeInfo from "./recipe-components/RecipeInfo";
import Home from "./Home";

function App() {
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);
  let r = [];

  // Clear ingredients
  const onClearIngredients = () => {
    setShowAddIngredient(false);
    setIngredients([]);
  };

  // Clear recipes
  const onClearRecipes = () => {
    setResults([]);
    let r = [];
  };

  // Add Ingredient
  const addIngredient = (ingredient) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newIngredient = { id, ...ingredient };
    setIngredients([...ingredients, newIngredient]);
  };

  // Delete Ingredient
  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  // Submit Ingredients
  const onSubmit = () => {
    let arr = "";
    for (let ingredient in ingredients) {
      arr += ingredients[ingredient].text + ", ";
      //console.log(ingredients[ingredient].text)
    }
    //navigate(`/search?q=${arr}`);
    //console.log(typeof arr)
    fetch("/search", {
      method: "POST",
      body: JSON.stringify({
        content: arr,
      }),
    })
      .then((response) => response.json().then((data) => ({ data, response })))
      .then(({ data, response }) => {
        //console.log(data["results"]["hits"]["hits"]);
        for (let hit in data["results"]["hits"]["hits"]) {
          let h = JSON.stringify(
            data["results"]["hits"]["hits"][hit]["_source"]
          );

          r.push(h);
        }
        if (r.length === 0) {
          r.push("No results found");
        }
        response = data;
        setResults(r);
        console.log(results);
      });
    console.log(results);
    console.log(typeof SampleRecipeData[0]);
    // console.log(typeof JSON.parse(results[0]))
  };

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home/>} >LINK TO RECIPE</Route>
        <Route exact path="/recipe" element={<Recipe/>} >LINK TO RECIPE</Route> 
      </Routes>
    </div>
  );
}

export default App;
