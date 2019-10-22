import React, { Component } from 'react';
import classes from './App.css';
// import GamesContainer from './Containers/GamesContainer/GamesContainer';
import DateTile from './Components/SliderCalendar/DateTiles/DateTiles';
import ChandeDaysButton from './Components/SliderCalendar/ChangeDaysButton/ChangeDaysButton';
// import Spinner from './Components/UI/Spinner/Spinner';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './store/actions';

class App extends Component {
  // state = {
  //   games: [],
  //   mounted: false,
  //   loading: true,
  //   clickedDate: moment(new Date()).format('YYYY-MM-DD'),
  //   numberOfGames: {},
  // };

  passDateForTileToGames = () => {
    const clickedDate = moment(
      event.target.getAttribute('data-date'),
      'D-MMM-YYYY'
    ).format('YYYY-MM-DD');
    this.getGamesForTiles(clickedDate);
    this.setState({ clickedDate: clickedDate });
    // dispatch({ type: 'CLICKED_DATE' });
  };

  changeDays = numberOfDays => {
    this.props.addFiveDays(numberOfDays);
    // this.getNumberOfGames();
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ mounted: true });
    }, 500);
  }

  render() {
    const middleFieldDate = this.props.middleTileDate;
    console.log(middleFieldDate);
    const daysForCalendar = [];
    for (let i = -2; i < 3; i++) {
      daysForCalendar.push([
        new Date(
          middleFieldDate.getFullYear(),
          middleFieldDate.getMonth(),
          middleFieldDate.getDate() + i
        ),
      ]);
    }

    const dateTiles = daysForCalendar.map((date, iteration) => {
      const dateForTile = date.toString().split(' ');
      // const dateTileDate = moment(new Date(dateForTile.join(' '))).format(
      //   'YYYY-MM-DD'
      // );

      // const activeTileCssToggle = dateTileDate == this.state.clickedDate;
      return (
        <DateTile
          key={iteration}
          label={dateForTile[2][0] == 0 ? dateForTile[2][1] : dateForTile[2]}
          dayName={dateForTile[0]}
          dayDate={dateForTile[2][0] == 0 ? dateForTile[2][1] : dateForTile[2]}
          dayMonth={dateForTile[1]}
          dayYear={dateForTile[3]}
          changeDate={this.passDateForTileToGames}
          // activeTile={activeTileCssToggle}
          // gamesOnDay={this.state.numberOfGames[dateTileDate]}
        />
      );
    });

    return (
      <div className={classes.mainContainer}>
        <div className={classes.DateTilesContainer}>
          <ChandeDaysButton
            arrowDirection={'left'}
            changeDays={() => this.changeDays(-5)}
          />
          {dateTiles}
          <ChandeDaysButton
            arrowDirection={'right'}
            changeDays={() => this.changeDays(5)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { middleTileDate: state.middleTileDate.middleTileDate };
};

const mapDispatchToProps = dispatch => {
  return {
    addFiveDays: payload => dispatch(actions.sliderAddFive(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
