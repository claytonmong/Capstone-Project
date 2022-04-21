import { FaTimes } from 'react-icons/fa'

const MyRecipe = ({ recipe, onDelete }) => {
  return (
    <div className="body">
      <div><h4>Name</h4>
      <p>{recipe.title}</p>
      <h4>Ingredients</h4>
      <p>{recipe.ingredients !== "" ? recipe.ingredients : "N/A"}&emsp;</p>
      <h4>Instructions</h4>
      <p>{recipe.instructions !== "" ? recipe.instructions : "N/A"}</p>
      <p>
        <br></br>
      </p>
      <input
        type="submit"
        value="Delete Recipe"
        className="btn btn-block"
        onClick={() => onDelete(recipe.id)}
      /></div>
    </div>
    
     
  )
}

export default MyRecipe