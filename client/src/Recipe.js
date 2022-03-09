


import RecipeInfo from "./recipe-components/RecipeInfo";

import {useLocation} from "react-router-dom";

const Recipe = () => {
	const location = useLocation();
	
	console.log(location.state.item)
	  return (
	<div>
	  <RecipeInfo recipe={location.state.item}/>
	</div>
  );
};
export default Recipe;




