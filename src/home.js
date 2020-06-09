import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core";
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
});

class Home extends React.Component {

  render() {
    return (
      <React.Fragment>
        <NavigationBar/>

        <Container maxWidth="sm" component="main" className={this.props.classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Witamy w klubie Squash Club
          </Typography>
        </Container>

        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
              <Grid item xs={12} md={localStorage.getItem("username") ? 6 : 12}>
                <Card>
                  <CardHeader
                    title="Przeglądaj rezerwacje"
                    titleTypographyProps={{ align: 'center' }}
                    className={this.props.classes.cardHeader}
                  />
                  <CardContent>
                    <div className={this.props.classes.cardPricing}>
                      <Typography variant="h6" color="textSecondary" align="center">
                        Przeglądaj dostępne rezerwacje w wybranym dniu
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="outlined" color="primary" href={"/bookingBoard"}>
                      Podgląd dostępności
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            {localStorage.getItem("username") &&
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="Moje rezerwacje"
                  titleTypographyProps={{ align: 'center' }}
                  className={this.props.classes.cardHeader}
                />
                <CardContent>
                  <div className={this.props.classes.card}>
                    <Typography variant="h6" color="textSecondary" align="center">
                      Zobacz aktywne rezerwacje, które zrobiłeś wcześniej
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined" color="primary" href={"/bookingPanel"}>
                    Moje rezerwacje
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            }
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home)