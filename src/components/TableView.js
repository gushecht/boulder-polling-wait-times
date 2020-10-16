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
  container: {
    maxHeight: '100%',
    position: 'absolute',
  },
  place: {
    fontWeight: 'bold',
  },
  address: {
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'underline',
    '& svg': {
      height: '12px',
    },
  },
});


const TableView = ({ data }) => {
  const classes = useStyles();

  const sorted = sortArrayOfObjectsByKey(data, 'Wait', 'ASC');

  const openInGoogleMaps = address => window.open(buildDirectionsUrl(address), '_blank');

  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Poll Center</TableCell>
            <TableCell align="left">Wait</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((place) => (
            <TableRow key={place.Poll}>
              <TableCell component="th" scope="row">
                <div className={classes.place}>{place.Poll}</div>
                <div className={classes.address} onClick={() => openInGoogleMaps(place.Address)}>{place.Address}<OpenInNewIcon/></div>
              </TableCell>
              <TableCell align="right">{place.Wait}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
