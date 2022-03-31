


import RecipeInfo from "./recipe-components/RecipeInfo";

import {useLocation, useNavigate} from "react-router-dom";

const Recipe = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const recipe = location.state.item;
	const searchRes = location.state.res;
	
	const handleClick = () => {
		console.log("clicked");
		navigate("/", { state: { id: 1, item: searchRes } });
	}
	console.log(location.state.item)
	  return (
	<div>
	  <RecipeInfo recipe={recipe}/>
	  <input
		type="submit"
		value="Return to Search Results"
		className="btn btn-block"
		onClick={handleClick}
	  />
	</div>
	
  );
};
export default Recipe;




