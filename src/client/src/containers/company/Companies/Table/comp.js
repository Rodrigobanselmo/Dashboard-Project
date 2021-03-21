import React from 'react';
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
  HeadCellLabel,
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
      <TableRow style={{maxWidth:'300px'}}>
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

TableTabs.TableRows = function RowComponent(row, index, data) {
  
  const labelId = `enhanced-table-checkbox-${index}`;
  var dateStart = row?.creation  && row.creation  && row.creation !== 0 ? NormalizeData(new Date(row.creation),'normal') : 'Indisponível';
  var dateEnd = row?.end  && row.end  && row.end !== 0 ? NormalizeData(new Date(row.end),'normal') : 'Presente';

  return (
    <TableRowComponent key={`${row.CNPJ}${index}`}>
        <TableCellComponent style={{width:'20%'}} align="left"><TextCell style={{marginLeft:13,marginRight:25}}>{row.CNPJ}</TextCell></TableCellComponent>
        <TableCellComponent style={{width:'27%'}} align="left"><TextCell style={{width:'90%',maxWidth:300}} >{row.name}</TextCell></TableCellComponent>
        <TableCellComponent style={{width:'25%'}} align="left"><TextCell style={{width:'90%'}}>{row.responsavel}</TextCell></TableCellComponent>
        <TableCellComponent style={{width:'18%'}} align="left"><TextCell style={{width:'90%'}} >{`${dateStart} - ${dateEnd}`}</TextCell></TableCellComponent>
        <StatusCell row={row}/>
        {/* <UserCell labelId={labelId} row={row}/>
        <TypeCell data={data} row={row}/>
        <TableCellComponent align="left"><TextCell >{row.admin}</TextCell></TableCellComponent> */}
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

function AddUserButton({onClick}) {

  return (
    <ButtonContainer onClick={onClick} className={'rowCenter'} >
      <Icons style={{fontSize:24,marginRight:5}} type={'Add'}/>
      <p className={'noBreakText'}>Nova Empresa</p>
    </ButtonContainer>
  )
}


function StatusCell({row}) {

  return (
    <TableCellComponent /* style={{width:40}} */ align="center" >
      <BootstrapTooltip /* placement="right" */  title={row.status} styletooltip={{transform: 'translateY(5px)'}}>
        <StatusComponent status={row.status} />
      </BootstrapTooltip>
    </TableCellComponent>
  )
} 