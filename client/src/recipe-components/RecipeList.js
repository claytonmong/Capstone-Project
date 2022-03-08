const RecipeList = ({ recipe }) => {
  return (
    <div className="body">
      <table>
        <tr>
          <td>{recipe.title}&emsp;</td>
          <td>{recipe.category}&emsp;</td>
          <td>{recipe.meta.total}&emsp;</td>
          <td>{recipe.calories}&emsp;</td>
        </tr>
      </table> 
    </div>
  );
};

export default RecipeList;