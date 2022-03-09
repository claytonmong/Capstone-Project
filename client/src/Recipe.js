import React from "react";
  
const Recipe = (props) => {
  return (
    <div>
      <h1>RECIPE</h1>
      <p>{props.data}</p>
    </div>
  );
};
  
export default Recipe;