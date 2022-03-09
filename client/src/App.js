import {
  Route,
  Routes,
} from "react-router-dom";

import Home from "./Home";
import Recipe from "./Recipe";

function App() {

  return (
    <div>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      <Route exact path="/recipe" element={<Recipe/>} ></Route> 
    </Routes>
  </div>
  );
}

export default App;
