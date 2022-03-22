import { useState } from "react";
import Header from "./enter-ingredients-components/Header";
import Ingredients from "./enter-ingredients-components/Ingredients";
import NotIngredients from "./enter-ingredients-components/NotIngredients";
import AddIngredient from "./enter-ingredients-components/AddIngredient";
import AddNotIngredient from "./enter-ingredients-components/AddNotIngredient";
import SampleRecipeData from "./sample-data/SampleRecipeData";
import RecipeList from "./recipe-components/RecipeList";

const Home = (props) => {
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [showNotAddIngredient, setShowNotAddIngredient] = useState(false);
  const [notingredients, setNotIngredients] = useState([]);
  const [results, setResults] = useState([]);
  let r = [];

  // Clear ingredients
  const onClearIngredients = () => {
    setShowAddIngredient(false);
    setIngredients([]);
    setShowNotAddIngredient(false);
    setNotIngredients([]);
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

  //
  // Delete Ingredient
  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  // Add Not-included Ingredient
  const addNotIngredient = (ingredient) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newIngredient = { id, ...ingredient };
    setNotIngredients([...notingredients, newIngredient]);
  };

  //
  // Delete Ingredient
  const deleteNotIngredient = (id) => {
    setNotIngredients(notingredients.filter((ingredient) => ingredient.id !== id));
  };

  // Submit Ingredients
  const onSubmit = () => {
    let arr = "";
    for (let ingredient in ingredients) {
      arr += ingredients[ingredient].text + ",";
      //console.log(ingredients[ingredient].text)
    }
    // slice the last if it is ,
    if (arr.charAt(arr.length -1) == ','){
      arr = arr.slice(0,-1)
    }
    
    // add not_included ingredients
    arr += ';'
    for (let ingredient in notingredients) {
      arr += notingredients[ingredient].text + ",";
      //console.log(ingredients[ingredient].text)
    }
    if (arr.charAt(arr.length -1) == ','){
      arr = arr.slice(0,-1)
    }
    //navigate(`/search?q=${arr}`);
    //console.log(typeof arr)
    console.log(arr)
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
    <div>
      <div className="container">
        <Header
          onAdd={() => setShowAddIngredient(!showAddIngredient)}
          showAdd={showAddIngredient}
          onNotAdd={() => setShowNotAddIngredient(!showNotAddIngredient)}
          showNotAdd={showNotAddIngredient}
        />
        {showAddIngredient && <AddIngredient onAdd={addIngredient} />}
        {showNotAddIngredient && <AddNotIngredient onAdd={addNotIngredient} />}

        {ingredients.length > 0 ? (
          <Ingredients ingredients={ingredients} onDelete={deleteIngredient} />
        ) : (
          ""//"No Ingredients Entered"
        )}
        {notingredients.length > 0 ? (
          <NotIngredients ingredients={notingredients} onDelete={deleteNotIngredient} />
        ) : (
          ""
        )}

        {(ingredients.length > 0 || notingredients.length >0) && (!showAddIngredient && !showNotAddIngredient) && (
          <input
            type="submit"
            value="Submit Ingredients"
            className="btn btn-block"
            onClick={onSubmit}
          />
        )}

        {(ingredients.length > 0 || notingredients.length >0) && (!showAddIngredient && !showNotAddIngredient) && (
          <input
            type="reset"
            value="Clear Ingredients"
            className="btn btn-block"
            onClick={onClearIngredients}
          />
        )}

      </div>
      {results.length > 0 && (
        <div>
          {typeof results === "undefined" ? (
            <p></p>
          ) : (
            results.map((member, i) => (
              <div key={i}>
                <RecipeList recipe={JSON.parse(member)} />
              </div>
            ))
          )}
        </div>
      )}
      {results.length > 0 && (
        <input
          type="reset"
          value="Clear Recipes"
          className="btn btn-block"
          onClick={onClearRecipes}
        />
      )}
    </div>
  );
};

export default Home;
