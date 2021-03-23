import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import InputSearch from '../../Dashboard/Components/Standard/Search';
import {Icons} from '../../Icons/iconsDashboard';
import {
  TableCellComponent,
  TableRowComponent,
  TextCell,
  HeadCellLabel,
  StatusComponent,
  FilterComponents,
  UserAvatar,
  GroupIcon,
  TextNameEmail,
  EmailSpan,
  ButtonContainer
} from './styles';
import Tabs from '../MuiHelpers/Tabs'
import {BootstrapTooltip} from '../MuiHelpers/Tooltip'
import Checkbox from '@material-ui/core/Checkbox';
import RichSelect from '../../Dashboard/Components/MultUsage/RichSelect'
import useTimeOut from '../../../hooks/useTimeOut';
import {NormalizeData} from '../../../helpers/DataHandler';
import {filterObject} from '../../../helpers/ObjectArray'
import TableMui from '../MuiHelpers/Table'


export default function TableTabs({children, tabsLabel, ...restProps }) {
  return (
      <Tabs tabsLabel={tabsLabel} {...restProps}>
      {children}
      </Tabs>
  );
}

export function FilterComponent(props) {


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
      {props.children}
    </FilterComponents>
  )
}


TableTabs.Head = function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{maxWidth:'300px'}}>
{/*       <TableCellComponent padding="checkbox">
          <Checkbox
            indeterminate={false}
            checked={false}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCellComponent> */}
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
              <HeadCellLabel className={'noBreakText'} headCell={headCell.id}>{headCell.label}</HeadCellLabel>
            </TableSortLabel>
          </TableCellComponent>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableTabs.TableRows = function RowComponent(row, index,data, selected=[]) {

  const labelId = `enhanced-table-checkbox-${index}`;
  var dateStart = row?.creation  && row.creation  && row.creation !== 0 ? NormalizeData(new Date(row.creation),'normal') : 'Indisponível';
  var dateEnd = row?.end  && row.end  && row.end !== 0 ? NormalizeData(new Date(row.end),'normal') : 'Presente';
  //const orderCells = [{name:'CNPJ'},{name:'responsavel'},{name:'creation',type:'start/end'},{name:'status',type:'status'}]

  const isItemSelected = selected.indexOf(row.CNPJ) !== -1;

  return (
    <TableRowComponent key={`${row[data.orderCells.id]}`}>
{/*         <TableCellComponent padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCellComponent> */}
        {data.orderCells.order.map((item,indexItem)=>{
          return(
            item.type ?
              (item.type === 'status' ?
                <StatusCell key={indexItem} item={item} row={row} index={indexItem}/>
                :
                item.type === 'start/end' ?
                <NormalCell key={indexItem} item={item} row={{creation:`${dateStart} - ${dateEnd}`}} index={indexItem}/>
                :
                <UserCell labelId={labelId} row={row}/>
              )
              :
              <NormalCell key={indexItem} item={item} row={row} index={indexItem}/>
          )
        })}
    </TableRowComponent>
  );
}

export function LoadingContent() {


  return (
    <div style={{margin:10,height:350}}>
      <LinearProgress />
    </div>
  );
}

function AddUserButton({onClick}) {

  return (
    <ButtonContainer onClick={onClick} className={'rowCenter'} >
      <Icons style={{fontSize:24,marginRight:5}} type={'Add'}/>
      <p className={'noBreakText'}>Nova Empresa</p>
    </ButtonContainer>
  )
}


function StatusCell({row,item,index}) {

  return (
    <TableCellComponent /* style={{width:40}} */ align="center" >
      <BootstrapTooltip /* placement="right" */  title={row.status} styletooltip={{transform: 'translateY(5px)'}}>
        <StatusComponent status={row.status} />
      </BootstrapTooltip>
    </TableCellComponent>
  )
}
function NormalCell({row,item,index}) {
  return (
    <TableCellComponent className='noBreakText' align="left">
      <TextCell style={{marginLeft:index==0?13:0,marginRight:20,maxWidth:200}}>
        {row[item.name]}
      </TextCell>
    </TableCellComponent>
  )
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
