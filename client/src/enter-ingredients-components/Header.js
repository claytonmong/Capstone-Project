import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "blue" : "green"}
        text={showAdd ? "Commit Ingredients" : "Add Ingredients"}
        onClick={onAdd}
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
