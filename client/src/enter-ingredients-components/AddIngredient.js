import { useState } from "react";

const AddIngredient = ({ onAdd }) => {
  const [text, setText] = useState("");

  const categoryList = ["Meat", "Dairy", "Vegetables", "Carbs"];

  const onSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length === 0) {
      alert("Please enter an ingredient");
      return;
    }

    onAdd({ text });
    setText("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Ingredient</label>
        <input
          type="text"
          placeholder="Add Ingredient"
          /* Ingredient must begin with a letter and only contains the symbols [a-zA-Z-'& ] */
          value={
            (text.charAt(0) === "-") |
            ((text.charAt(0) === "'") |
              (text.charAt(0) === "&") |
              (text.charAt(0) === " "))
              ? ""
              : text.replace(/[^a-zA-Z-'& ]/g, "")
          }
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <input type="submit" value="Save Ingredient" className="btn btn-block" />
      <div>
        Note: You Can Also Enter Any of The Following General Categories of
        Ingredients:{" "}
      </div>
      <ul className="unordered-list">
        {categoryList.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default AddIngredient;
