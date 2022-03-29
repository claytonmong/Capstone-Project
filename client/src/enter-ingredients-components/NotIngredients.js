import NotIngredient from "./NotIngredient";

const NotIngredients = ({ ingredients, onDelete }) => {
  return (
    <>
      {ingredients.map((ingredient) => (
        <NotIngredient
          key={ingredient.id}
          ingredient={ingredient}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default NotIngredients;
