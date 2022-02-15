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

import { useState } from "react";
import Header from "./enter-ingredients-components/Header";
import Ingredients from "./enter-ingredients-components/Ingredients";
import AddIngredient from "./enter-ingredients-components/AddIngredient";

function App() {
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  var response;

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
  const onSubmit = () => {
    
    let arr = "";
    for (let ingredient in ingredients) {
      arr += ingredients[ingredient].text + ", ";
      console.log(ingredients[ingredient].text)
    }
    //navigate(`/search?q=${arr}`);
    console.log(typeof arr)
    fetch('/search',{
      method: 'POST',
      body: JSON.stringify({
        content: arr
      })
    }).then(response => response.json()
      .then(data => ({ data, response })))
      .then(({ data, response }) =>  {
        console.log(data)
      })
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddIngredient(!showAddIngredient)}
        showAdd={showAddIngredient}
      />
      {showAddIngredient && <AddIngredient onAdd={addIngredient} />}
      {ingredients.length > 0 ? (
        <Ingredients ingredients={ingredients} onDelete={deleteIngredient} />
      ) : (
        "No Ingredients Entered"
      )}
      {ingredients.length > 0 && !showAddIngredient && (
        <input
          type="submit"
          value="Submit Ingredients"
          className="btn btn-block"
          onClick={onSubmit}
        />
      )}
    </div>
  );
}

export default App;
