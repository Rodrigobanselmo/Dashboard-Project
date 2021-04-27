import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import InputSearch from '../../../../components/Dashboard/Components/Standard/Search';
import {Icons} from '../../../../components/Icons/iconsDashboard';
import {
  TableCellComponent,
  TableRowComponent,
  TextCell,
  TypeContainer,
  HeadCellLabel,
  UserContainer,
  StatusComponent,
  FilterComponents,
  UserAvatar,
  GroupIcon,
  TextNameEmail,
  EmailSpan,
  ButtonContainer
} from './styles';
import Tabs from '../../../../components/Main/MuiHelpers/Tabs'
import {BootstrapTooltip} from '../../../../components/Main/MuiHelpers/Tooltip'
import RichSelect from '../../../../components/Dashboard/Components/MultUsage/RichSelect'
import useTimeOut from '../../../../hooks/useTimeOut';
import {NormalizeData} from '../../../../helpers/DataHandler';



export default function TableTabs({children, tabsLabel, ...restProps }) {
    return (
        <Tabs tabsLabel={tabsLabel} {...restProps}>
        {children}
        </Tabs>
    );
}

TableTabs.FilterComponents =  React.memo(function FilterComponent(props) {


  const [onTimeOut,onClearTime] = useTimeOut()

  function onInputSearch(e) {
    props.setLoadContent(true)
    onClearTime()
    onTimeOut(()=>props.setLoadContent(false),1000)
    props.setSearch(e.target.value)
}

  return(
    <FilterComponents>
      <InputSearch icons={Icons} onInputSearch={onInputSearch} search={props.search} onCleanSearch={()=>props.setSearch('')}/>
      <AddUserButton onClick={()=>props.setOpen(true)}/>
    </FilterComponents>
  )
})

TableTabs.Head = function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.data.headCells.map((headCell) => (
          <TableCellComponent
            key={headCell.id}
            align={headCell.align ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <HeadCellLabel headCell={headCell.id}>{headCell.label}</HeadCellLabel>
            </TableSortLabel>
          </TableCellComponent>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableTabs.TableRows = function RowComponent(row, index, data) {

  const labelId = `enhanced-table-checkbox-${index}`;
  var date = NormalizeData(new Date(row.creation),'string')

  return (
    <TableRowComponent key={`${row.email}${row.creation}`}>
        <UserCell labelId={labelId} row={row}/>
        <TypeCell data={data} row={row}/>
        <TableCellComponent  align="left"><TextCell /* style={{maxWidth: 120,width:90}} */ >{date}</TextCell></TableCellComponent>
{/*         <TableCellComponent align="left"><TextCell>{row.company}</TextCell></TableCellComponent>
        <TableCellComponent align="left"><TextCell >{row.admin}</TextCell></TableCellComponent> */}
        <StatusCell row={row}/>
    </TableRowComponent>
  );
}

TableTabs.LoadingContent = function Loading() {


  return (
    <div style={{margin:10,height:350}}>
      <LinearProgress />
    </div>
  );
}

function UserCell({row,labelId}) {


  return (
    <TableCellComponent component="th" id={labelId} scope="row" padding="none">
      <UserContainer >
          <UserAvatar >
              <GroupIcon style={{fontSize:28}} type={row.image}/>
          </UserAvatar>
          <TextNameEmail >{row.name?row.name:'Aguardando...'}<br/>
          <EmailSpan >{row.email}</EmailSpan> </TextNameEmail>
      </UserContainer>
  </TableCellComponent>
  )
}

function AddUserButton({onClick}) {

  return (
    <ButtonContainer onClick={onClick} className={'rowCenter'} >
      <Icons style={{fontSize:24,marginRight:5}} type={'Add'}/>
      <p className={'noBreakText'}>Adicionar Usuário</p>
    </ButtonContainer>
  )
}

function TypeCell({row,data}) {

  function arrayData(data) {
    const array = []
    data.map((item)=>{
      array.push(item.name)
    })
    return array
  }

  return (
    <TableCellComponent align="left">
      <p className={'noBreakText'}/*  style={{width:100}} */ >{row.type}</p>
    </TableCellComponent>
  )
}

function StatusCell({row}) {

  return (
    <TableCellComponent  align="left" >
      <BootstrapTooltip /* placement="right" */  title={row.status} styletooltip={{transform: 'translateY(5px)'}}>
        <StatusComponent status={row.status} />
      </BootstrapTooltip>
    </TableCellComponent>
  )
}
