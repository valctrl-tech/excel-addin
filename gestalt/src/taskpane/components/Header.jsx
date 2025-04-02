import * as React from "react";
import PropTypes from "prop-types";
import { Image, tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#2d2d2d",
    borderBottom: "1px solid #404040",
  },
  logo: {
    width: "32px",
    height: "32px",
    marginRight: "10px",
  },
  title: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
});

const Header = (props) => {
  const { title, logo } = props;
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <Image className={styles.logo} src={logo} alt={title} />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
};

export default Header;
