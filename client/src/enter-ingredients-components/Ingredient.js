import { FaTimes } from "react-icons/fa";

const Ingredient = ({ ingredient, onDelete }) => {
  return (
    <div id  = "name" className="ingredient">
      <h3>
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(ingredient.id)}
        />
        {ingredient.text}{" "}
      </h3>
    </div>
  )

  
}
 
console.log(document.getElementById("name"));
export default Ingredient;
