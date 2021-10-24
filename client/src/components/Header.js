import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import logo512 from "images/logo-512.png";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#ffffff",
    width: "165px",
    float: "left",
    display: "block",
    left: "0",
    borderRadius: "10px",
    margin: "1rem",
  },
  logo: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: 600,
    color: "#000000",
    textAlign: "left",
    height: "100px",
  },
  subtext: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: 300,
    color: "#b9b9b9",
    textAlign: "left",
    paddingTop: "1rem",
    paddingLeft: ".3rem",
  },
}));

export default function Header() {
  const { header, logo, subtext } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar>
        <div>{casedelstLogo}</div>
        <div>{casedelstSubtext}</div>
      </Toolbar>
    );
  };

  const casedelstLogo = (
    <Typography variant="h4" component="h1" className={logo}>
      CASE
    </Typography>
  );

  const casedelstSubtext = (
    <Typography variant="h6" component="h1" className={subtext}>
      DELST
    </Typography>
  );

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}
