import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "8px",
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(120),
    fontFamily: "Righteous",
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <img src="./logo.svg" alt="logo" />

            <Typography variant="h4" className={classes.title} color="inherit">
              <Link to="/"> Pokedex</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}
