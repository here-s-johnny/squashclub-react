import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  }
});

const NavigationBar = (props) => {

    return (
      <React.Fragment>
        <CssBaseline/>
        <AppBar position="static" color="default" elevation={0} className={props.classes.appBar}>
          <Toolbar className={props.classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={props.classes.toolbarTitle}>
              Squash Club
            </Typography>
            <nav>
              <Link variant="button" color="textPrimary" href="/" className={props.classes.link}>
                Strona główna
              </Link>
              <Link variant="button" color="textPrimary" href="/bookingBoard" className={props.classes.link}>
                Zobacz dostępne korty
              </Link>
              {localStorage.getItem("username") &&
              <Link variant="button" color="textPrimary" href="/bookingPanel" className={props.classes.link}>
                Moje rezerwacje
              </Link>}
            </nav>
            {localStorage.getItem("username") ?
              <Button onClick={() => localStorage.clear()} href="/" color="primary" variant="outlined"
                      className={props.classes.link}>
                Logout
              </Button> :
              <Button href="/login" color="primary" variant="outlined" className={props.classes.link}>
                Login
              </Button>}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
}

export default withStyles(styles)(NavigationBar)