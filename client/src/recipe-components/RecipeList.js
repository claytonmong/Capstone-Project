const RecipeList = ({ recipe }) => {
  return (
    <div className="body">
      <table>
        <th>Recipe Name</th>
        <th>Category</th>
        <th>Time</th>
        <th>Calories</th>
        <tr>
          <td>{recipe.title}&emsp;</td>
          <td>{recipe.category}&emsp;</td>
          <td>{recipe.meta.total}&emsp;</td>
          <td>{recipe.calories}&emsp;</td>
        </tr>
        {recipe.image !== "Recipes Import\\No-Image-Available.jpg" && (
          <p>
            <img src={recipe.image} alt="" width="128px" height="128px" />
          </p>
        )}
      </table> 
    </div>
  );
};

export default RecipeList;