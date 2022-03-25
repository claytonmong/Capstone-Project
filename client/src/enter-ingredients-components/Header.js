import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd, onNotAdd, showNotAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "blue" : "green"}
        text={showAdd ? "Commit Ingredients" : "Include Ingredients"}
        onClick={onAdd}
      />
      <Button
        color={showNotAdd ? "red" : "green"}
        text={showNotAdd ? "Commit Ingredients" : "Do not Include Ingredients"}
        onClick={onNotAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Ingredients",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
