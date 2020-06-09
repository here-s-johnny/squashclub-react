import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import _ from 'lodash';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
    width: 100,
    marginTop: 50,
    marginBottom: 50,
    marginLeft: "47%"
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
      selectedDate: "",
      hours: [],
      tableVisible: false,
      selectedHour: "",
      snackbarOpen: false
    }
  }

  handleDateChange = (e) => {
    this.setState({
      selectedDate: e.target.value
    })

    this.fetchReservations(e.target.value)
  };

  fetchReservations = (date) => {
    return fetch(`http://localhost:8080/reservations?date=${date}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ hours: json.bookingHours })
        this.setState({ tableVisible: true })
      })
      .catch(error => console.error(error))
  }

  handleSelectHour = (e) => {
    this.setState({
      selectedHour: e.target.value
    })
  }

  createNewBooking = () => {
    fetch('http://localhost:8080/reservations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: this.state.selectedDate,
        hour: this.state.selectedHour,
        username: localStorage.getItem("username")
      })
    })
      .then(() => this.fetchReservations(this.state.selectedDate))
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
    return (
      <React.Fragment>
        <NavigationBar/>

        <Container maxWidth="sm" component="main" className={this.props.classes.heroContent}>
          <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
            Podgląd dostępnych rezerwacji
          </Typography>
        </Container>

        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item xs={12} md={12}>
              <Typography variant="caption" align="center" color="textPrimary"
                          className={this.props.classes.marginLeft}>
                Wybierz datę
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="date"
                type="date"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                className={this.props.classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ style: { textAlign: "end" }, min: "2020-06-07" }}
              />
            </Grid>
          </Grid>
        </Container>

        {this.state.tableVisible &&
        <TableContainer component={Paper} className={this.props.classes.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Godzina</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_.range(8, 17).map((hour) => (
                <TableRow key={hour}>
                  <TableCell component="th" scope="row" align="center"
                             className={this.state.hours.includes(hour) ? this.props.classes.backgroundRed : this.props.classes.backgroundGreen}>
                    {hour}:00
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        }

        {localStorage.getItem("username") && this.state.tableVisible &&
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item xs={12} md={12}>
              <Typography variant="caption" align="center" color="textPrimary"
                          className={this.props.classes.marginLeftLabel}>
                Wybierz godzinę, którą chcesz zarezerwować
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl className={this.props.classes.marginLeftSelect}>
                <InputLabel>Godzina</InputLabel>
                <Select
                  value={this.state.selectedHour}
                  onChange={this.handleSelectHour}
                >
                  {_.range(8, 17).map((hour) => {
                    if (this.state.hours.includes(hour)) {
                      return null;
                    }
                    return <MenuItem value={hour}>{hour}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="outlined" color="primary" disabled={this.state.selectedHour === ""}
                      className={this.props.classes.button} onClick={this.createNewBooking}>Zarezerwuj</Button>
            </Grid>
          </Grid>
        </Container>
        }

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
          open={this.state.snackbarOpen}
          onClose={this.handleCloseSnackbar}
          message="Utworzono nową rezerwację"
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BookingBoard)