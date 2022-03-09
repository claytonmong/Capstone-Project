import { useState } from "react";
import Header from "./enter-ingredients-components/Header";
import Ingredients from "./enter-ingredients-components/Ingredients";
import AddIngredient from "./enter-ingredients-components/AddIngredient";
import SampleRecipeData from "./sample-data/SampleRecipeData";
import RecipeList from "./recipe-components/RecipeList";

const Home = (props) => {
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
    <div>
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
        {ingredients.length > 0 && !showAddIngredient && (
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
