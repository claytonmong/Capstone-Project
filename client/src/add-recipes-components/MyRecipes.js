import MyRecipe from "./MyRecipe"

const MyRecipes = ({ recipes, onDelete }) => {
  return (
    <>
      {recipes.map((recipe, index) => (
          <div><MyRecipe key={index} recipe={recipe} onDelete={onDelete} /></div>
        
      ))}
    </>
  )
}

export default MyRecipes