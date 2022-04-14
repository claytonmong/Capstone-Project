import { FaTimes } from "react-icons/fa";

const RecipeInfo = ({ recipe }) => {
  let recipeInstr = "";
  for (let str in recipe.instructions) {
    recipeInstr =
      recipeInstr +
      recipe.instructions[str].toString().replace("Advertisement", "") +
      " ";
  }
  return (
    <div className="body">
      <div className="center">
        <h1>{recipe.title}</h1>
      </div>
      <h2>Required Ingredients</h2>
      <ul className="unordered-list">
        {recipe.ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipeInstr}</p>
      <h2>Nutrition</h2>
      <ul>
        <li>Calories: {recipe.calories !== "" ? recipe.calories : "N/A"}</li>
        <li>
          Carbs:{" "}
          {recipe.nutrition.carbs !== "" ? recipe.nutrition.carbs : "N/A"}
        </li>
        <li>
          Fat: {recipe.nutrition.fat !== "" ? recipe.nutrition.fat : "N/A"}
        </li>
        <li>
          Fiber:{" "}
          {recipe.nutrition.fiber !== "" ? recipe.nutrition.fiber : "N/A"}
        </li>
        <li>
          Protein:{" "}
          {recipe.nutrition.protein !== "" ? recipe.nutrition.protein : "N/A"}
        </li>
        <li>
          Sodium:{" "}
          {recipe.nutrition.sodium !== "" ? recipe.nutrition.sodium : "N/A"}
        </li>
        <li>
          Sugar:{" "}
          {recipe.nutrition.sugar !== "" ? recipe.nutrition.sugar : "N/A"}
        </li>
      </ul>
      <h2>Additional Recipe Information</h2>
      <ul>
        <li>
          Additional notes:{" "}
          {recipe.meta.additional !== "" ? recipe.meta.additional : "N/A"}
        </li>
        <li>
          Cook for:{" "}
          {recipe.meta.cook !== "" ? recipe.meta.cook : "see instructions"}
        </li>
        <li>
          Prepare for:{" "}
          {recipe.meta.prep !== ""
            ? " " + recipe.meta.prep
            : "see instructions"}
        </li>
        <li>Number of servings: {recipe.meta.servings}</li>
      </ul>
      {recipe.image !== "Recipes Import\\No-Image-Available.jpg" && (
        <div className="center">
          <img src={recipe.image} alt="" width="375px" height="375px" />
        </div>
      )}
    </div>
  );
};

export default RecipeInfo;
