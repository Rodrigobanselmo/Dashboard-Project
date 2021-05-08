import React, {useState,memo} from "react";
import clsx from "clsx";
import memoize from "memoize-one";

import { FixedSizeList as List,areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { makeStyles,withStyles,createStyles } from "@material-ui/styles";
import { darken,lighten } from "@material-ui/core/styles";
import {BootstrapTooltip} from '../MuiHelpers/Tooltip'

import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {RowCell} from './comp'
import styled from "styled-components";

const StyledTableSortLabel = withStyles((theme) =>
createStyles({
    root: {
      color: theme.palette.table.textHeader,
      "&:hover": {
        color: darken(theme.palette.table.textHeader,0.2),
      },
      '&$active': {
        color: lighten(theme.palette.table.textHeader,0.2),
      },
    },
    active: {},
    icon: {
      color: 'inherit !important'
    },
  })
)(TableSortLabel);

const Check = styled.div`
  background-color: ${({theme})=>theme.palette.table.checkboxBack};
  border-radius: 3px;
  height: 17px;
  width: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const useTableStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    marginBottom:0,
    borderTopRadius:10,
  },
  table: {
    height: "100%",
    overflow: 'auto hidden',
    // borderBottom: `2px ${theme.palette.table.line} solid`,
    border: `1px ${theme.palette.table.line} solid`,
    padding:0,
    marginBottom:-10
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
    boxSizing: "border-box",
    minWidth: "100%",
    borderLeft: `2px ${theme.palette.table.line} solid`,
    borderRight: `2px ${theme.palette.table.line} solid`,
    cursor: 'pointer',
    '&:hover' : {backgroundColor:darken(theme.palette.table.hover,0.10)},
    // borderRight: `2px ${theme.palette.table.line} solid`,
    // borderLeft: `2px ${theme.palette.table.line} solid`,
    //overflow: 'visible hidden',
    overflow: 'hidden hidden',
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    borderRight: `1px ${theme.palette.table.line} solid`,
    borderLeft: `2px ${theme.palette.table.line} solid`,
    alignItems: "center",
    boxSizing: "border-box",
    minWidth: "100%",
    backgroundColor:theme.palette.type !=='dark' ?theme.palette.table.header:darken(theme.palette.table.hover,0.25),
    //borderBottom: `${theme.palette.type !=='dark' ?'1px':'2px'} ${theme.palette.table.line} solid`,
    borderTop: `2px ${theme.palette.table.line} solid`,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden hidden',
    //borderBottom: `${theme.palette.type !=='dark' ?'1px':'2px'}  ${theme.palette.table.line} solid`,
  },
  rowCheck: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:0,
    boxSizing: 'border-box',
    margin:0,
    backgroundColor:theme.palette.type !=='dark' ?theme.palette.table.header:darken(theme.palette.table.hover,0.25),
    borderBottom: `${theme.palette.type !=='dark' ?'1px':'2px'}  ${theme.palette.type !=='dark' ?darken(theme.palette.table.line,0.4):theme.palette.table.line} solid`,
    //borderTop: `1px ${theme.palette.table.line} solid`,
    ////borderBottom: `1px ${theme.palette.table.line} solid`,
    //borderLeft: `2px ${theme.palette.table.line} solid`,
    borderRight: `2px ${theme.palette.table.line} solid`,
  },
  cell: {
    boxSizing: "border-box",
    display: "block",
    flexGrow: 0,
    //borderBottom: `0px ${theme.palette.table.line} solid`,
    borderBottom: `${theme.palette.type !=='dark' ?'1px':'2px'}  ${theme.palette.table.line} solid`,
    flexShrink: 0,
    color: theme.palette.table.textCell,
    // flex: 1
  },
  checkCell: {
    boxSizing: "border-box",
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:0,
    borderBottom: `0px ${theme.palette.table.line} solid`,
    margin:0,
    borderBottom: `${theme.palette.type !=='dark' ?'1px':'2px'}  ${theme.palette.type !=='dark' ?darken(theme.palette.table.line,0.4):theme.palette.table.line} solid`,
  },
  expandingCell: {
    flex: 1
  },
  everyOtherRow: {
    backgroundColor: theme.palette.table.everyOtherRow,
  },
  column: {
    color: theme.palette.table.textHeader,
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
        <TableCell style={{height: rowSize,width:45}} className={clsx(classes.checkCell)}component="div" padding="checkbox">
          <Check >
          <Checkbox
            indeterminate={false}
            checked={rowCount > 0 && selected.length === rowCount}
            onChange={onSelectAllClick}
            color={'primary'}
            inputProps={{ 'aria-label': 'select all desserts' }}
            />
         </Check >
        </TableCell>
      }
      {columns.map((column, colIndex) => {

        if (column) return (
          <TableCell
            key={colIndex}
            component="div"
            className={clsx(
              classes.cell,
              classes.column,
              !column.width && classes.expandingCell
            )}
            style={{
              flex:column.flex || false,
              height: rowSize,
              minWidth:column.minWidth || false,
              display:'flex',
              justifyContent: column.align ? column.align : 'flex-start',
              position:'relative',
              alignItems:'center',
              marginRight:'0.05%',
              transform: column.align === 'center' ? `translateX(${colIndex>2?-colIndex/1.5:0}px)`:`translateX(0px)`,
              //backgroundColor:colIndex ==0?'grey':colIndex ==1?'green':colIndex ==2?'red':colIndex ==3?'blue':colIndex ==4?'orange':colIndex ==4?'yellow':colIndex ==4?'black':'transparent',
            }}
            sortDirection={orderBy === column.id ? order : false}
          >
            <div style={{position:'absolute',width:'85%'}}>
            <StyledTableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={createSortHandler(column.id)}
              style={{
                //minWidth:column.minWidth||column.width|| false,
                //transform: `translateY(${-16}px)`,
                justifyContent: column.align ? column.align : 'flex-start',
                //backgroundColor:colIndex ==1?'red':'transparent',
                height: rowSize,
                width:'100%',
                transform: column.align === 'center' ? `translateX(${13}px)`:`translateX(0px)`,
              }}
            >
              {column.tooltip?
                <BootstrapTooltip placement="bottom-start"  title={column.tooltip} styletooltip={{transform: 'translateY(0px)'}}>
                  <p style={{
                    textAlign:column.align  ? column.align : "left",
                    //backgroundColor:colIndex ==3?'green':'transparent',
                    display: 'inline',height:'fit-content',
                  }}>
                  {column.label}
                  </p>
                </BootstrapTooltip>
              :
                <p style={{
                  textAlign:column.align  ? column.align : "left",
                  //backgroundColor:colIndex ==3?'green':'transparent',
                  display: 'inline',height:'fit-content',
                }}>
                  {column.label}
                </p>
            }
            </StyledTableSortLabel>
            </div>
          </TableCell>
        );
        else null
      })}
    </TableRow>
  );
},areEqual);

const Row = memo(({ index, style, data: { columns, items, classes, setSelected, selected, handleCellClick, rowSize,onCorrectData } }) => {

  const item = items[index];

  const labelId = `enhanced-table-checkbox-${index}`;
  const isItemSelected = selected ? selected.indexOf(item?.CNPJ ?? item?.cnpj ?? item?.id ?? item?.uid ) !== -1 : false;

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
    <TableRow component="div" style={{...style}}  className={clsx(classes.row,
      index % 2 !== 0  && classes.everyOtherRow
    )}>
      {selected &&
        <TableCell component="div" className={clsx(classes.rowCheck)} style={{height: rowSize,width:45}} padding="checkbox">
          <Check >
          <Checkbox
            checked={isItemSelected}
            onClick={(e)=>handleClick(e,item?.id ?? item?.CNPJ ?? item?.uid ,item)}
            inputProps={{ 'aria-labelledby': labelId }}
            color={'primary'}
            />
          </Check>
        </TableCell>
      }
      {columns.map((column, colIndex) => {
        if (column) return (
          <RowCell onCorrectData={onCorrectData} colIndex={colIndex} onClick={(e)=>handleCellClick(e,item?.CNPJ ?? item?.cnpj ?? item?.id ?? item?.uid,item,colIndex)} key={item?.id ? item.id + colIndex: item.CNPJ?item.CNPJ + colIndex:item.uid + colIndex} column={column} classes={classes} item={item} rowSize={rowSize}/>
        );
        else null
      })}
    </TableRow>
  );
},areEqual);

const itemKey = (index, data) => data.items[index]?.id ?? data.items[index]?.cnpj ?? data.items[index]?.CNPJ ?? data.items[index]?.uid; //To fix

const createItemData = memoize((classes, columns, data, setSelected, selected, handleCellClick, rowSize, onCorrectData ) => ({
  columns,
  classes,
  items: data,
  setSelected,
  selected,
  handleCellClick,
  rowSize,
  onCorrectData
}));

const ReactWindowTable = ({ data, columns, initialOrder='creation',setSelected,selected,handleCellClick,rowSize,onCorrectData }) => {
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
        const newSelected = data.map((n) => n?.id ?? n?.CNPJ ?? n?.uid );
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };



    console.log('ReactWindowTable')
    const dataRowsOrdered = stableSort(data, getComparator(order, orderBy))
    const itemData = createItemData(classes, columns, dataRowsOrdered,setSelected,selected,handleCellClick,rowSize,onCorrectData );
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
          <TableHead component="div" >
            <TableColumns  rowSize={rowSize} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} classes={classes} columns={columns} selected={selected} onSelectAllClick={handleSelectAllClick} rowCount={data.length} />
          </TableHead>

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
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    height: "100%",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    //overflow: 'hidden hidden',
    overflow: 'auto hidden',
    borderBottom: `0px ${theme.palette.table.line} solid`,
    borderRadius:10,
  },
}));

const App = ({rowsCells,minHeight=0,headCells,setSelected,selected,handleCellClick,initialOrder,rowSize=55,onCorrectData}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div style={{height:rowsCells.length > 7?440: rowsCells.length*rowSize+rowSize+5,borderRadius:10,minHeight:minHeight}} className={classes.paper}>
          <ReactWindowTable onCorrectData={onCorrectData} data={rowsCells} rowSize={rowSize} columns={headCells} setSelected={setSelected} selected={selected} handleCellClick={handleCellClick} initialOrder={initialOrder} />
        </div>
        <p style={{textAlign:"right",marginBottom:-10,marginTop:0}}>Total: {rowsCells.length}</p>
    </div>
  );
};

export default App;
