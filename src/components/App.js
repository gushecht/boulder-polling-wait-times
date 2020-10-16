import React, { useEffect, useState } from 'react';
import data from '../data';
import MapContainer from './MapView';
import logo from '../assets/bce.png'
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import TableView from './TableView';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  content: {
    flex: '1 1 auto',
    position: 'relative',
  },
  header: {
    flex: '0 1 auto',
  },
  logo: {
    [theme.breakpoints.down('sm')]: { width: '50%' },
    [theme.breakpoints.up('sm')]: { width: '40%' },
    display: 'block',
    margin: '0 auto',
    padding: '16px 16px 0',
  },
  titleAndToggle: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 1 auto',
    justifyContent: 'space-between',
    padding: '0 16px',
  }
}));

const App = () => {
  // useEffect(() => {
  //   fetch('https://app.redash.io/boulder-county/api/queries/485071/results.json?api_key=UspwLVrgappzWF9m92FMKi3qDM73pPNynKCtMs6S')
  //     .then(res => res.json())
  //     .then(console.log)
  // }, []);

  const classes = useStyles();

  const [view, setView] = useState('list');

  const changeView = () => setView(view === 'list' ? 'map': 'list');

  const pollingPlaces = data.query_result.data.rows;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img className={classes.logo} src={logo} />
        <div className={classes.titleAndToggle}>
          <h1>Poll wait times</h1>
          <div onClick={changeView}>{view === 'list' ? <MapIcon/> : <ListIcon/>}</div>
        </div>
      </div>
      <div className={classes.content}>
        {view === 'list' ? <TableView data={pollingPlaces}/> : <MapContainer pollingPlaces={pollingPlaces} />}
      </div>
    </div>
  );
};

export default App;
