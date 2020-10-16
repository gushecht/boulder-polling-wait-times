import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { sortArrayOfObjectsByKey } from '../util/array';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { buildDirectionsUrl } from '../util/googleMaps';

const useStyles = makeStyles({
  address: {
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'underline',
    '& svg': {
      height: 14,
    },
  },
  container: {
    maxHeight: '100%',
    maxWidth: 800,
    position: 'absolute',
  },
  place: {
    fontWeight: 'bold',
  },
  wrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
});


const TableView = ({ data }) => {
  const classes = useStyles();

  const sorted = sortArrayOfObjectsByKey(data, 'Wait', 'ASC');

  const openInGoogleMaps = address => window.open(buildDirectionsUrl(address), '_blank');

  return (
    <div className={classes.wrapper}>
      <TableContainer className={classes.container} component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Vote Center</TableCell>
              <TableCell align="right">Wait Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((place) => (
              <TableRow key={place.polling_station}>
                <TableCell component="th" scope="row">
                  <div className={classes.place}>{place.polling_station}</div>
                  <div className={classes.address} onClick={() => openInGoogleMaps(place.address)}>{place.address}<OpenInNewIcon/></div>
                </TableCell>
                <TableCell align="right">{place.minutes_wait}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableView;
