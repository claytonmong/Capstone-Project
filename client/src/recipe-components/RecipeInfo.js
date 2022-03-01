import { FaTimes } from "react-icons/fa";

const RecipeInfo = ({ recipe }) => {
  return (
    <div className="body">
      <h1>{recipe.title}</h1>
      <h2>Required Ingredients</h2>
      <ul className="unordered-list">
        {recipe.ingredients.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
      <h2>Nutrition</h2>
      <ul>
        <li>Calories: {recipe.calories}</li>
        <li>Carbs: {recipe.nutrition.carbs}</li>
        <li>Fat: {recipe.nutrition.fat}</li>
        <li>Fiber: {recipe.nutrition.fiber}</li>
        <li>Protein: {recipe.nutrition.protein}</li>
        <li>Sodium: {recipe.nutrition.sodium}</li>
        <li>Sugar: {recipe.nutrition.sugar}</li>
      </ul>
      <h2>Additional Recipe Information</h2>
      <ul>
        <li>Additional Notes: {recipe.meta.additional}</li>
        <li>Cook for {recipe.meta.cook}</li>
        <li>Prepare for {recipe.meta.prep}</li>
        <li>Number of servings: {recipe.meta.servings}</li>
      </ul>
    </div>
  );
};

export default RecipeInfo;
