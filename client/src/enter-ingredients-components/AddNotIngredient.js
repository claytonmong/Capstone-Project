import { useState } from "react";

const AddNotIngredient = ({ onAdd }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please enter an ingredient you do not want to include");
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
          placeholder="Add NotIngredient"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>

      <input type="submit" value="Save Ingredient" className="btn btn-block" />
    </form>
  );
};

export default AddNotIngredient;
