import React, {useState,memo} from "react";
import clsx from "clsx";
import memoize from "memoize-one";

import { FixedSizeList as List,areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { makeStyles,withStyles } from "@material-ui/styles";
import { darken } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import useTimeOut from '../../hooks/useTimeOut';
import {NormalizeData} from '../../helpers/DataHandler';
import {RowCell} from './windowComp'
import styled from "styled-components";

const Head = styled(TableHead)`
  &&&.MuiTableHead-root {
    //background-color: red;
  }
`;

const useTableStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    borderBottom: `2px ${theme.palette.background.line} solid`,
    borderLeft: `2px ${theme.palette.background.line} solid`,
    borderRadius:10,
  },
  table: {
    height: "100%",
    overflow: 'scroll hidden',
    borderRight: `2px ${theme.palette.background.line} solid`,
  },
  list: {
  },
  thead: {
  },
  tbody: {
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    boxSizing: "none",
    minWidth: "100%",
    borderBottom: `2px ${theme.palette.background.line} solid`,
    borderRight: `1px ${theme.palette.background.line} solid`,
    cursor: 'pointer',
    '&:hover' : {backgroundColor:darken(theme.palette.background.paper,0.13)},
    // borderRight: `2px ${theme.palette.background.line} solid`,
    // borderLeft: `2px ${theme.palette.background.line} solid`,
    //overflow: 'visible hidden',
    overflow: 'hidden hidden',
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    boxSizing: "border-box",
    minWidth: "100%",
    backgroundColor:darken(theme.palette.background.paper,0.25),
    borderBottom: `2px ${theme.palette.background.line} solid`,
    //borderLeft: `2px ${theme.palette.background.line} solid`,
    borderTop: `2px ${theme.palette.background.line} solid`,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rowCheck: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:0,
    boxSizing: 'border-box',
    margin:0,
    backgroundColor:darken(theme.palette.background.paper,0.25),
    borderTop: `1px ${theme.palette.background.line} solid`,
    borderBottom: `1px ${theme.palette.background.line} solid`,
    //borderLeft: `2px ${theme.palette.background.line} solid`,
    borderRight: `2px ${theme.palette.background.line} solid`,
  },
  cell: {
    display: "block",
    flexGrow: 0,
    borderBottom: `0px ${theme.palette.background.line} solid`,
    flexShrink: 0,
    // flex: 1
  },
  checkCell: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:0,
    borderBottom: `0px ${theme.palette.background.line} solid`,
    margin:0,
  },
  expandingCell: {
    flex: 1
  },
  column: {
    color: theme.palette.text.secondary,
  }
}));

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

const TableColumns = memo(({ classes, columns, order, orderBy, onRequestSort,rowCount, selected, onSelectAllClick, rowSize}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableRow component="div" className={clsx(classes.headerRow)}>
      {selected &&
        <TableCell style={{height: rowSize}} className={clsx(classes.checkCell)}component="div" padding="checkbox">
          <Checkbox
            indeterminate={false}
            checked={rowCount > 0 && selected.length === rowCount}
            onChange={onSelectAllClick}
            color={'primary'}
            inputProps={{ 'aria-label': 'select all desserts' }}
            />
        </TableCell>
      }
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            key={colIndex}
            component="div"
            variant="head"
            className={clsx(
              classes.cell,
              classes.column,
              !column.width && classes.expandingCell
            )}
            style={{
              flexBasis: column.width || false,
              height: rowSize,
              minWidth:column.minWidth || false,
              transform: colIndex != 0 ?`translateX(${-colIndex-4}px)`:`translateX(0px)`,
            }}
            scope="col"
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
              style={{width:column.align=='center'  ? '100%' : 'auto',transform: column.align  == 'center' ?`translateX(${10}px)`:`translateX(0px)`}}
            >
              <p style={{textAlign:column.align  ? column.align : "left",width:'100%',transform: column.align  == 'center' ?`translateX(${6}px)`:`translateX(0px)`,}}>
              {column.label}
              </p>
            </TableSortLabel>
          </TableCell>
        );
      })}
    </TableRow>
  );
},areEqual);

const Row = memo(({ index, style, data: { columns, items, classes, setSelected, selected, handleCellClick, rowSize } }) => {

  const item = items[index];

  const labelId = `enhanced-table-checkbox-${index}`;
  var dateStart = item?.creation  && item.creation  && item.creation !== 0 ? NormalizeData(new Date(item.creation),'normal') : 'Indisponível';
  var dateEnd = item?.end  && item.end  && item.end !== 0 ? NormalizeData(new Date(item.end),'normal') : 'Presente';
  const isItemSelected = selected ? selected.indexOf(item?.CNPJ ?? item?.cnpj ?? item?.id ) !== -1 : false;

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

  console.log('Row')
  return (
    <TableRow component="div" style={{marginTop:30}}  className={classes.row} style={style}>
      {selected &&
        <TableCell component="div" className={clsx(classes.rowCheck)} style={{height: rowSize}} padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            onClick={(e)=>handleClick(e,item?.id ?? item?.CNPJ)}
            inputProps={{ 'aria-labelledby': labelId }}
            color={'primary'}
            />
        </TableCell>
      }
      {columns.map((column, colIndex) => {
        return (
          <RowCell onClick={(e)=>handleCellClick(e,item?.CNPJ ?? item?.cnpj ?? item?.id,item)} key={item?.id ? item.id : item.CNPJ + colIndex} column={column} classes={classes} item={item} rowSize={rowSize}/>
        );
      })}
    </TableRow>
  );
},areEqual);

const itemKey = (index, data) => data.items[index]?.id ?? data.items[index]?.cnpj ?? data.items[index]?.CNPJ; //To fix

const createItemData = memoize((classes, columns, data, setSelected, selected, handleCellClick, rowSize ) => ({
  columns,
  classes,
  items: data,
  setSelected,
  selected,
  handleCellClick,
  rowSize
}));

const ReactWindowTable = ({ data, columns, initialOrder='creation',setSelected,selected,handleCellClick,rowSize }) => {
    const classes = useTableStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(initialOrder);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = data.map((n) => n?.id ?? n?.CNPJ );
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };



    console.log('ReactWindowTable')
    const dataRowsOrdered = stableSort(data, getComparator(order, orderBy))
    const itemData = createItemData(classes, columns, dataRowsOrdered,setSelected,selected,handleCellClick,rowSize );
    const TableMinWidth = () => {
      var minWithTable = 0
      columns.map((column)=>{
        if (column?.width) minWithTable = minWithTable+column.width
        else if (column?.minWidth) minWithTable  = minWithTable+column.minWidth
      })
      return minWithTable
    };

    return (
      <div className={classes.root}>
        <Table style={{minWidth:TableMinWidth()+45}} className={classes.table} component="div">
          <Head component="div" >
            <TableColumns  rowSize={rowSize} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} classes={classes} columns={columns} selected={selected} onSelectAllClick={handleSelectAllClick} rowCount={data.length} />
          </Head>

          <TableBody style={{height:300}} component="div" >
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className={classes.list}
                  height={height}
                  width={width}
                  itemCount={data.length}
                  itemSize={rowSize}
                  itemKey={itemKey}
                  itemData={itemData}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </TableBody>

        </Table>
      </div>
    )
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    flexGrow: 1,
    height: 440,
    overflow: 'hidden hidden',
    //overflow: 'hidden hidden',
  },
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    //overflow: 'visible hidden',
    overflow: 'hidden hidden',
    marginBottom:20,
    borderRadius:10
  },
}));

const App = ({rowsCells,headCells,setSelected,selected,handleCellClick,initialOrder,rowSize=55}) => {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <div  className={classes.container}>
        <div className={classes.paper}>
          <ReactWindowTable data={rowsCells} rowSize={rowSize} columns={headCells} setSelected={setSelected} selected={selected} handleCellClick={handleCellClick} initialOrder={initialOrder} />
        </div>
      </div>
    </div>
  );
};

export default App;
