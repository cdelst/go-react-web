import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
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
