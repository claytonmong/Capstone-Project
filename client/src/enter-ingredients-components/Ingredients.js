import Ingredient from "./Ingredient";

const Ingredients = ({ ingredients, onDelete }) => {
  return (
    <>
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient}
          onDelete={onDelete}
        />
      ))}
    </>
    
  );
  
};
console.log(Ingredient.ingredient);
export default Ingredients;
