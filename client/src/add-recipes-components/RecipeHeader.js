import PropTypes from "prop-types";
import Button from "../enter-ingredients-components/Button";

// onAdd
// showAdd
const RecipeHeader = ({ title, onAdd, showAdd, onManage, showManage }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "blue" : "green"}
        text={showAdd ? "Finish Adding" : "Add a Recipe"}
        onClick={onAdd}
      />
      <Button
        color={showManage ? "red" : "green"}
        text={showManage ? "Close" : "Manage My Recipes"}
        onClick={onManage}
      />
    </header>
  );
};

RecipeHeader.defaultProps = {
  title: "My Recipes",
};

RecipeHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default RecipeHeader;
