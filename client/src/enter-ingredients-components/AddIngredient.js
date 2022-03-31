import { useState } from "react";

const AddIngredient = ({ onAdd }) => {
  const [text, setText] = useState("");

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
            (text === "-") | ((text === "'") | (text === "&") | (text === " "))
              ? ""
              : text.replace(/[^a-zA-Z-'& ]/g, "")
          }
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>

      <input type="submit" value="Save Ingredient" className="btn btn-block" />
    </form>
  );
};

export default AddIngredient;
