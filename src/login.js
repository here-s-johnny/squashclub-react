import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SportsTennisIcon from '@material-ui/icons/SportsTennis';
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      snackbarOpen: false
    }
  }

  onSubmit = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          localStorage.setItem("username", this.state.username);
          this.setState({redirect: true})
        } else {
          this.setState({
            snackbarOpen: true
          })
        }})
      .catch(error => {
        console.error(error)
        this.setState({
          snackbarOpen: true
        })
      })
  }

  onChange = (value) => (e) => {
    this.setState({
      [value]: e.target.value
    })
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen: false
    })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to='/' />;
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <SportsTennisIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Zaloguj się
          </Typography>
          <div className={this.props.classes.form}>
            <TextField
              onChange={this.onChange("username")}
              value={this.state.username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nazwa"
              label="Nazwa użytkownika"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              onChange={this.onChange("password")}
              value={this.state.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              onClick={this.onSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Zaloguj się
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Nie masz konta? Zarejestruj się"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
          open={this.state.snackbarOpen}
          onClose={this.handleCloseSnackbar}
          message="Logowanie zakończone niepowodzeniem"
        />
      </Container>
    );
  }
}

export default withStyles(styles)(Login)
