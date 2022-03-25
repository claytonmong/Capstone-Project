import { FaTimes } from "react-icons/fa";

const NotIngredient = ({ ingredient, onDelete }) => {
  return (
    <div className="ingredient">
      <h3>
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(ingredient.id)}
        />
        {ingredient.text}{" "}
      </h3>
    </div>
  );
};

export default NotIngredient;
