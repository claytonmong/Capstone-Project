import { useNavigate } from "react-router-dom";

const RecipeList = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("clicked");
    console.log(recipe);
    navigate("/recipe", { state: { id: 1, item: recipe } });
  };
  return (
    <div className="body">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Time</th>
            <th>Calories</th>
          </tr>
          <tr>
            <td>{recipe.title}&emsp;</td>
            <td>{recipe.category}&emsp;</td>
            <td>{recipe.meta.total}&emsp;</td>
            <td>{recipe.calories}&emsp;</td>
          </tr>
        </tbody>
      </table>
      <p>
        <br></br>
      </p>
      {recipe.image !== "Recipes Import\\No-Image-Available.jpg" && (
        <p>
          <img src={recipe.image} alt="" width="128px" height="128px" />
        </p>
      )}
      <input
        type="submit"
        value="View Full Recipe"
        className="btn btn-block"
        onClick={handleClick}
      />
    </div>
  );
};

export default RecipeList;
