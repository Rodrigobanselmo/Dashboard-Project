import React from "react";
import clsx from "clsx";
import memoize from "memoize-one";

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { makeStyles } from "@material-ui/styles";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import createData from "./data";

const useTableStyles = makeStyles(theme => ({
  root: {
    display: "block",
    flex: 1
  },
  table: {
    height: "100%",
    width: "100%"
  },
  list: {},
  thead: {},
  tbody: {
    width: "100%"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    boxSizing: "border-box",
    minWidth: "100%",
    width: "100%"
  },
  headerRow: {},
  cell: {
    display: "block",
    flexGrow: 0,
    flexShrink: 0
    // flex: 1
  },
  expandingCell: {
    flex: 1
  },
  column: {}
}));

const TableColumns = ({ classes, columns }) => {
  return (
    <TableRow component="div" className={clsx(classes.row, classes.headerRow)}>
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            key={colIndex}
            component="div"
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            className={clsx(
              classes.cell,
              classes.column,
              !column.width && classes.expandingCell
            )}
            style={{
              flexBasis: column.width || false,
              height: ROW_SIZE
            }}
            scope="col"
          >
            {column.label}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const ROW_SIZE = 48;

const Row = ({ index, style, data: { columns, items, classes } }) => {
  const item = items[index];

  return (
    <TableRow component="div" className={classes.row} style={style}>
      {columns.map((column, colIndex) => {
        return (
          <TableCell
            key={item.id + colIndex}
            component="div"
            variant="body"
            align={column.numeric || false ? "right" : "left"}
            className={clsx(
              classes.cell,
              !column.width && classes.expandingCell
            )}
            style={{
              flexBasis: column.width || false,
              height: ROW_SIZE
            }}
          >
            {item[column.dataKey]}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const itemKey = (index, data) => data.items[index].id;

const createItemData = memoize((classes, columns, data) => ({
  columns,
  classes,
  items: data
}));

const ReactWindowTable = ({ data, columns }) => {
  const classes = useTableStyles();

  const itemData = createItemData(classes, columns, data);

  return (
    <div className={classes.root}>
      <Table className={classes.table} component="div">
        <TableHead component="div" className={classes.thead}>
          <TableColumns classes={classes} columns={columns} />
        </TableHead>

        <TableBody component="div" className={classes.tbody}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={classes.list}
                height={height}
                width={width}
                itemCount={data.length}
                itemSize={ROW_SIZE}
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
  );
};

const columns = [
  {
    label: "Product",
    dataKey: "product"
    // width: 200
  },
  {
    label: "Price\u00A0($)",
    dataKey: "price",
    width: 120
  },
  {
    label: "Calories\u00A0(g)",
    dataKey: "calories",
    numeric: true,
    width: 120
  },
  {
    label: "Fat\u00A0(g)",
    dataKey: "fat",
    numeric: true,
    width: 120
  },
  {
    label: "Carbs\u00A0(g)",
    dataKey: "carbs",
    numeric: true,
    width: 120
  },
  {
    label: "Protein\u00A0(g)",
    dataKey: "protein",
    numeric: true,
    width: 120
  }
];

const data = createData();

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    flexGrow: 1,
    height: 500
  },
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  toolbar: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(4)
  },
  title: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Paper className={classes.paper}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h2" variant="h5" className={classes.title}>
              {"Example Table"}
            </Typography>

            <div className={classes.spacer} />
          </Toolbar>

          <ReactWindowTable data={data} columns={columns} />
        </Paper>
      </Container>
    </div>
  );
};

export default App;
