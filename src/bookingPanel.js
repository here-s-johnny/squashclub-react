import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import NavigationBar from "./navigationBar";

const styles = (theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginLeft: 355,
    marginRight: theme.spacing(1),
    width: 200,
  },
  marginLeft: {
    marginLeft: "46%"
  },
  tableContainer: {
    width: 500,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: "35%"
  },
  backgroundRed: {
    backgroundColor: theme.palette.warning.light
  },
  backgroundGreen: {
    backgroundColor: theme.palette.success.light
  },
  marginLeftLabel: {
    marginLeft: "36%",
  },
  marginLeftSelect: {
    marginLeft: "44%",
    minWidth: 120,
  },
  button: {
    marginLeft: "43.5%"
  }
});

class BookingBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      snackbarOpen: false
    }
  }

  componentDidMount() {
    this.fetchReservations();
  }

  fetchReservations = () => {
    return fetch(`http://localhost:8080/reservations/users/${localStorage.getItem("username")}`)
      .then(response => response.json())
      .then(json => this.setState({ reservations: json.bookings }))
      .catch(error => console.error(error))
  }

  handleDeleteBooking = (reservation) => {
    fetch(`http://localhost:8080/reservations`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    })
      .then(() => this.fetchReservations())
      .then(() => this.setState({
        snackbarOpen: true
      }))
      .catch(error => console.error(error))
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen: false
    })
  }

  render() {

    if (!localStorage.getItem("username")) {
      return null
    }

    return (
      <React.Fragment>
        <NavigationBar/>

        <Container maxWidth="sm" component="main" className={this.props.classes.heroContent}>
          <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
            Twoje rezerwacje
          </Typography>
        </Container>

        <TableContainer component={Paper} className={this.props.classes.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Godzina</TableCell>
                <TableCell>Kort</TableCell>
                <TableCell align="center">Usuń rezerwację</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.reservations.map((reservation) => (
                <TableRow>
                  <TableCell component="th" scope="row" align="left">
                    {reservation.date}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {reservation.hour}:00
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {reservation.court}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Button color="primary" onClick={() => this.handleDeleteBooking(reservation)}>Usuń</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
          open={this.state.snackbarOpen}
          onClose={this.handleCloseSnackbar}
          message="Usunięto rezerwację"
        />

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BookingBoard)