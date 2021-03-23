import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import styled from "styled-components";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '0px 10px',
    backgroundColor: 'transparent',
    borderRadius:15
  },
  table: {
    backgroundColor: 'transparent',
    minWidth: 750,
  },
  tableCell: {
    borderColor: theme.palette.background.line,
  },
}));

const TablePaginationComponent = withStyles((theme) => ({
    root: {
    backgroundColor: 'transparent',
    },
}))((props) => <TablePagination {...props} />);

const TableContainerComponent = withStyles((theme) => ({
    root: {
    backgroundColor: 'transparent',
    },
}))((props) => <TableContainer {...props} />);

const TableBodyComponent = withStyles((theme) => ({
    root: {
    backgroundColor: 'transparent',
    },
}))((props) => <TableBody {...props} />);

const TableComponent = withStyles((theme) => ({
    root: {
    },
}))((props) => <Table {...props} />);


export default function EnhancedTable({
    rowPage=false,
    rowComponent,
    headComponent:Head,
    data,
    pagination=false,
    initialOrder='name',
    selected,
    setSelected
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(initialOrder);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowPage);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.rows.map((n) => n?.id ?? n?.CNPJ );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const emptyRows = rowPage ? rowsPerPage - Math.min(rowsPerPage, data.rows.length - page * rowsPerPage) : 0;

  return (
    <div className={classes.root}>
        <TableContainerComponent>
            <TableComponent
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
            >
            <Head
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                data={data}
                selected={selected}
                onSelectAllClick={handleSelectAllClick}
                rowCount={data.rows.length}
            />
            <TableBodyComponent>
                {stableSort(data.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row,index)=>rowComponent(row,index,data,selected,handleClick))}
                {emptyRows > 0 && pagination && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell className={classes.tableCell} colSpan={60} />
                </TableRow>
                )}
            </TableBodyComponent>
            </TableComponent>
        </TableContainerComponent>
        {pagination ?
            <TablePaginationComponent
            rowsPerPageOptions={[]}
            component="div"
            count={data.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        :
            <div style={{height:30}}/>
        }
    </div>
  );
}
