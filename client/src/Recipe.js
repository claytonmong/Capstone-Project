


import RecipeInfo from "./recipe-components/RecipeInfo";

import {useLocation} from "react-router-dom";

const Recipe = () => {
	const location = useLocation();
	const recipe = location.state.item;
	
	console.log(location.state.item)
	  return (
	<div>
	  <RecipeInfo recipe={recipe}/>
	</div>
  );
};
export default Recipe;




