import Pluralize from "pluralize";
import React, { Component, useState, useEffect } from "react";
import Header from "./enter-ingredients-components/Header";
import Ingredients from "./enter-ingredients-components/Ingredients";
import NotIngredients from "./enter-ingredients-components/NotIngredients";
import AddIngredient from "./enter-ingredients-components/AddIngredient";
import AddNotIngredient from "./enter-ingredients-components/AddNotIngredient";
import SampleRecipeData from "./sample-data/SampleRecipeData";
import RecipeList from "./recipe-components/RecipeList";
import { useLocation } from "react-router-dom";

const Home = (props) => {
  const location = useLocation();
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [showNotAddIngredient, setShowNotAddIngredient] = useState(false);

  let [ingredients, setIngredients] = useState([]);
  let [ingredientsSingular, setIngredientsSingular] = useState([]);
  let [ingredientsPlural, setIngredientsPlural] = useState([]);

  let [notingredients, setNotIngredients] = useState([]);
  let [notingredientsSingular, setNotIngredientsSingular] = useState([]);
  let [notingredientsPlural, setNotIngredientsPlural] = useState([]);

  let [results, setResults] = useState([]);
  let r = [];
  const getResBack = () => {
    if (location.state) {
      if (location.state.item) {
        console.log(" LOCATION STATE is NOT null");
        results = location.state.item;
      }
      if (location.state.ingredListItem) {
        ingredients = location.state.ingredListItem;
        ingredientsSingular = location.state.sIngredListItem;
        ingredientsPlural = location.state.pIngredListItem;
      }
      if (location.state.notingredListItem) {
        notingredients = location.state.notingredListItem;
        notingredientsSingular = location.state.sNotIngredListItem;
        notingredientsPlural = location.state.pNotIngredListItem;
      }
    } else {
      console.log(" LOCATION STATE its null");
    }
  };
  getResBack();
  // Clear ingredients
  const onClearIngredients = () => {
    if (location.state && location.state.ingredListItem) {
      location.state.ingredListItem = null;
    }
    setShowAddIngredient(false);
    setIngredients([]);
    setIngredientsSingular([]);
    setIngredientsPlural([]);
  };

  // Clear  notingredients
  const onClearNotIngredients = () => {
    if (location.state && location.state.notingredListItem) {
      location.state.notingredListItem = null;
    }
    setShowNotAddIngredient(false);
    setNotIngredients([]);
    setNotIngredientsSingular([]);
    setNotIngredientsPlural([]);
  };

  // Clear recipes
  const onClearRecipes = () => {
    if (location.state && location.state.item) {
      location.state.item = null;
    }
    setResults([]);
  };

  // Add Ingredient
  const addIngredient = (ingredient) => {
    if (location.state && location.state.ingredListItem) {
      location.state.ingredListItem = null;
    }
    const id = Math.floor(Math.random() * 10000) + 1;
    const newIngredient = { id, ...ingredient };
    setIngredients([...ingredients, newIngredient]);

    const ingred1 = Pluralize(ingredient.text, 1);
    const newIngredient1 = { id, ingred1 };
    setIngredientsSingular([...ingredientsSingular, newIngredient1]);

    const ingred2 = Pluralize(ingredient.text, 2);
    const newIngredient2 = { id, ingred2 };
    setIngredientsPlural([...ingredientsPlural, newIngredient2]);
  };

  //
  // Delete Ingredient
  const deleteIngredient = (id) => {
    if (location.state && location.state.ingredListItem) {
      location.state.ingredListItem = null;
    }
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    setIngredientsSingular(
      ingredientsSingular.filter((ingredient) => ingredient.id !== id)
    );
    setIngredientsPlural(
      ingredientsPlural.filter((ingredient) => ingredient.id !== id)
    );
  };

  // Add Not-included Ingredient
  const addNotIngredient = (ingredient) => {
    if (location.state && location.state.notingredListItem) {
      location.state.notingredListItem = null;
    }
    const id = Math.floor(Math.random() * 10000) + 1;
    const newIngredient = { id, ...ingredient };
    setNotIngredients([...notingredients, newIngredient]);

    const ingred1 = Pluralize(ingredient.text, 1);
    const newIngredient1 = { id, ingred1 };
    setNotIngredientsSingular([...notingredientsSingular, newIngredient1]);

    const ingred2 = Pluralize(ingredient.text, 2);
    const newIngredient2 = { id, ingred2 };
    setNotIngredientsPlural([...notingredientsPlural, newIngredient2]);
  };

  //
  // Delete Ingredient
  const deleteNotIngredient = (id) => {
    if (location.state && location.state.notingredListItem) {
      location.state.notingredListItem = null;
    }
    setNotIngredients(
      notingredients.filter((ingredient) => ingredient.id !== id)
    );
    setNotIngredientsSingular(
      notingredientsSingular.filter((ingredient) => ingredient.id !== id)
    );
    setNotIngredientsPlural(
      notingredientsPlural.filter((ingredient) => ingredient.id !== id)
    );
  };

  // Submit Ingredients
  const onSubmit = () => {
    onClearRecipes();
    let r = [];
    let arr = "";
    for (let ingredient in ingredientsSingular) {
      arr += ingredientsSingular[ingredient].ingred1 + ",";
      //console.log(ingredients[ingredient].text);
    }
    for (let ingredient in ingredientsPlural) {
      arr += ingredientsPlural[ingredient].ingred2 + ",";
      //console.log(ingredients[ingredient].text);
    }

    // slice the last if it is ,
    if (arr.charAt(arr.length - 1) === ",") {
      arr = arr.slice(0, -1);
    }

    // add not_included ingredients
    arr += ";";
    for (let ingredient in notingredientsSingular) {
      arr += notingredientsSingular[ingredient].ingred1 + ",";
      //console.log(ingredients[ingredient].text);
    }
    for (let ingredient in notingredientsPlural) {
      arr += notingredientsPlural[ingredient].ingred2 + ",";
      //console.log(ingredients[ingredient].text);
    }

    if (arr.charAt(arr.length - 1) === ",") {
      arr = arr.slice(0, -1);
    }
    //navigate(`/search?q=${arr}`);
    //console.log(typeof arr)


    // @Ben - Trying to get the API to work
    fetch("/search", {
      method: "POST",
      body: JSON.stringify({
        content: arr,
      }),
    })
    .then(response => {
      console.log('array', arr);
      console.log('response: ', response);
      console.log('response.json(): ', response.json());
    })
    // End of @Ben




    console.log(arr);
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
        if (r.length !== 0) {
          response = data;
          setResults(r);
        }
      });

    console.log(results);
    console.log(typeof SampleRecipeData[0]);
    // console.log(typeof JSON.parse(results[0]))
  };
  return (
    <div>
      <div className="parent">
        <div className="container">
          <Header
            title={"Ingredients to Include"}
            onAdd={() => setShowAddIngredient(!showAddIngredient)}
            showAdd={showAddIngredient}
          />
          {showAddIngredient && <AddIngredient onAdd={addIngredient} />}

          {ingredients.length > 0 ? (
            <Ingredients
              ingredients={ingredients}
              onDelete={deleteIngredient}
            />
          ) : (
            "" //"No Ingredients Entered"
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
        <div className="container">
          <Header
            title={"Ingredients to Exclude"}
            onAdd={() => setShowNotAddIngredient(!showNotAddIngredient)}
            showAdd={showNotAddIngredient}
          />
          {showNotAddIngredient && (
            <AddNotIngredient onAdd={addNotIngredient} />
          )}

          {notingredients.length > 0 ? (
            <NotIngredients
              ingredients={notingredients}
              onDelete={deleteNotIngredient}
            />
          ) : (
            ""
          )}

          {notingredients.length > 0 && !showNotAddIngredient && (
            <input
              type="reset"
              value="Clear Ingredients"
              className="btn btn-block"
              onClick={onClearNotIngredients}
            />
          )}
        </div>
      </div>
      <div className="center">
        {ingredients.length > 0 &&
          !showAddIngredient &&
          !showNotAddIngredient && (
            <input
              type="submit"
              value="Submit Ingredients"
              className="btn btn-block"
              onClick={onSubmit}
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
                {console.log("stupid")}
                <RecipeList
                  recipe={JSON.parse(member)}
                  searchRes={results}
                  ingredList={ingredients}
                  sIngredList={ingredientsSingular}
                  pIngredList={ingredientsPlural}
                  notingredList={notingredients}
                  sNotIngredList={notingredientsSingular}
                  pNotIngredList={notingredientsPlural}
                />
              </div>
            ))
          )}
        </div>
      )}
      <div className="center">
        {results.length > 0 && (
          <input
            type="reset"
            value="Clear Recipes"
            className="btn btn-block"
            onClick={onClearRecipes}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
