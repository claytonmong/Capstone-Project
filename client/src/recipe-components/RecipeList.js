import { useNavigate } from "react-router-dom";

const RecipeList = ({
  recipe,
  searchRes,
  ingredList,
  sIngredList,
  pIngredList,
  notingredList,
  sNotIngredList,
  pNotIngredList,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("clicked");
    console.log(recipe);
    navigate("/recipe", {
      state: {
        id: 1,
        item: recipe,
        res: searchRes,
        ingredListItem: ingredList,
        sIngredListItem: sIngredList,
        pIngredListItem: pIngredList,
        notingredListItem: notingredList,
        sNotIngredListItem: sNotIngredList,
        pNotIngredListItem: pNotIngredList,
      },
    });
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
            <td>{recipe.category !== "" ? recipe.category : "N/A"}&emsp;</td>
            <td>
              {recipe.meta.total !== ""
                ? recipe.meta.total
                : "see instructions"}
              &emsp;
            </td>
            <td>{recipe.calories !== "" ? recipe.calories : "N/A"}&emsp;</td>
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
