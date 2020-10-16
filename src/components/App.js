import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MapContainer from './MapView';
import logo from '../assets/bce.png'
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import TableView from './TableView';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 1 auto',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 1 auto',
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: 800,
    padding: '16px',
  },
  headerAndLogo: {
    flex: '0 1 auto',
  },
  logo: {
    [theme.breakpoints.down('sm')]: { margin: '0 auto' },
    [theme.breakpoints.up('sm')]: { margin: '0' },
    display: 'block',
    padding: '16px 16px 0',
    width: 190,
  },
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  spinner: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  titleAndToggle: {
    display: 'flex',
    '& h2': {
      margin: 0,
    },
    '& svg': {
      height: '16px',
      width: '16px',
    },
  },
  toggle: {
    '& svg': {
      height: '1.3em',
      width: '1.3em',
    },
  },
}));

const App = () => {
  const classes = useStyles();

  const [pollingPlaces, setPollingPlaces] = useState(null);
  const [view, setView] = useState('list');

  useEffect(() => {
    fetch('/wait-times')
      .then(res => res.json())
      .then(setPollingPlaces)
  }, []);

  const changeView = () => setView(view === 'list' ? 'map': 'list');

  return (
    <div className={classes.root}>
      <div className={classes.headerAndLogo}>
        <img className={classes.logo} src={logo} />
        <div className={classes.header}>
          <div className={classes.titleAndToggle}>
            <h2>Vote Center wait times</h2>
            <Tooltip enterTouchDelay={0} title="Data provided by poll workers" placement="top-start">
              <HelpOutlineIcon />
            </Tooltip>
          </div>
          <div className={classes.toggle} onClick={changeView}>{view === 'list' ? <MapIcon/> : <ListIcon/>}</div>
        </div>
      </div>
      <div className={classes.content}>
        {
          pollingPlaces === null ?
            <div className={classes.spinner} ><CircularProgress/><br />Loading live wait times...</div> :
            view === 'list' ? <TableView data={pollingPlaces}/> : <MapContainer pollingPlaces={pollingPlaces} />
        }
      </div>
    </div>
  );
};

export default App;
