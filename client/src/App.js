
import { useState } from "react";
import {
  Router,
  Switch,
  Route,
  Routes,
  Redirect,
  Link,
} from "react-router-dom";
import Header from "./enter-ingredients-components/Header";
import Ingredients from "./enter-ingredients-components/Ingredients";
import AddIngredient from "./enter-ingredients-components/AddIngredient";
import SampleRecipeData from "./sample-data/SampleRecipeData";
import RecipeInfo from "./recipe-components/RecipeInfo";
import RecipeList from "./recipe-components/RecipeList";
import Home from "./Home";
import Recipe from "./Recipe";

function App() {

  return (
    <div>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route exact path="/recipe" element={<Recipe/>} ></Route> 
    </Routes>
  </div>
  );
}

export default App;
