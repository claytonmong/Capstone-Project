import { useState } from "react";

const AddIngredient = ({
  onAdd,
  // saveIncludeCategory,
  // clearIncludeCategories,
}) => {
  const [text, setText] = useState("");

  // // State with list of all checked item
  // const [checked, setChecked] = useState([]);
  const categoryList = ["Meat", "Dairy"];

  // // Add/Remove checked item from list
  // const handleCheck = (event) => {
  //   var updatedList = [...checked];
  //   if (event.target.checked) {
  //     updatedList = [...checked, event.target.value];
  //   } else {
  //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //   }
  //   setChecked(updatedList);
  // };

  // // Return classes based on whether item is checked
  // var isChecked = (item) =>
  //   checked.includes(item) ? "checked-item" : "not-checked-item";

  const onSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length === 0) {
      alert("Please enter an ingredient");
      return;
    }

    onAdd({ text });
    setText("");
  };

  // const onSave = () => {
  //   clearIncludeCategories();

  //   for (let category in categoryList) {
  //     if (checked.includes(categoryList[category])) {
  //       const cat = categoryList[category];
  //       saveIncludeCategory({ cat });
  //     }
  //   }
  // };

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
      {/* <div className="checkList">
        <div className="title">
          Select General Categories of Ingredients to Include:
        </div>
        <div className="list-container">
          {categoryList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
        <input
          type="button"
          value="Save Selections"
          className="btn btn-block"
          onClick={onSave}
        />
      </div> */}
    </form>
  );
};

export default AddIngredient;
