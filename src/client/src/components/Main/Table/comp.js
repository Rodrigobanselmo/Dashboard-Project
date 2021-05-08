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
  ButtonContainer,
  ButtonContainerFilter,
} from './styles';
import Tabs from '../MuiHelpers/Tabs'
import {BootstrapTooltip} from '../MuiHelpers/Tooltip'
import Checkbox from '@material-ui/core/Checkbox';
import useTimeOut from '../../../hooks/useTimeOut';
import {NormalizeData} from '../../../helpers/DataHandler';
import IconButton from '../MuiHelpers/IconButton';
import RichTooltip from '../../Dashboard/Components/MultUsage/RichTooltip'
import {ThemeContext} from "styled-components";
import styled from "styled-components";

const NodataContainer = styled.div`
  display: flex;

  & p {
    border-radius:10px;
    text-align: center;
    padding:30px;
    width:100%;
    border: 2px dashed ${({theme})=> theme.palette.background.line};
    color: ${({theme})=> theme.palette.text.third};
  }
`;


const TooltipItem = styled.div`
  padding:5px;
  margin-bottom:7px;
  border-radius: 4px;
  border: 1px ${({theme})=>theme.palette.background.line} solid;
`;


const TitleTooltip = styled.p`
  margin-bottom:10px;
  font-size: 17px;
  //text-align: center;
`;


const TextTooltip = styled.p`
  color: ${({theme})=> theme.palette.text.secondary };;
  font-size: 15px;
`;

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
    if (props.setLoadContent) props.setLoadContent(true)
    onClearTime()
    if (props.setLoadContent) onTimeOut(()=>props.setLoadContent(false),1000)
    props.setSearch(e.target.value)
}

  return(
    <FilterComponents style={props?.style??{}}>
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
        {props.selected &&
          <TableCellComponent padding="checkbox">
              <Checkbox
                indeterminate={false}
                checked={props.rowCount > 0 && props.selected.length === props.rowCount}
                onChange={props.onSelectAllClick}
                color={'primary'}
                inputProps={{ 'aria-label': 'select all desserts' }}
                />
            </TableCellComponent>
          }
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

TableTabs.TableRows = function RowComponent(row, index,data,selected,handleClick,handleCellClick,styleCell) {

  const labelId = `enhanced-table-checkbox-${index}`;
  var dateStart = row?.creation  && row.creation  && row.creation !== 0 ? NormalizeData(new Date(row.creation),'normal') : 'Indisponível';
  var dateEnd = row?.end  && row.end  && row.end !== 0 ? NormalizeData(new Date(row.end),'normal') : 'Presente';

  const isItemSelected = selected ? selected.indexOf(row?.CNPJ ?? row?.cnpj ?? row?.id ) !== -1 : false;

  return (
    <TableRowComponent key={`${row[data.orderCells.id]}`}>
      {selected &&
        <TableCellComponent style={styleCell?{...styleCell}:{padding:'10px 0'}} padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            onClick={(e)=>handleClick(e,row?.CNPJ ?? row?.id)}
            inputProps={{ 'aria-labelledby': labelId }}
            color={'primary'}
            />
        </TableCellComponent>
        }
        {data.orderCells.order.map((item,indexItem)=>{
          return(
            item.type ?
              (item.type === 'status' ?
                <StatusCell key={indexItem} onClick={(e)=>handleCellClick(e,row?.CNPJ ?? row?.cnpj ?? row?.id,row,index)} item={item} row={row} index={indexItem}/>
                :
                item.type === 'start/end' ?
                <NormalCell key={indexItem} onClick={(e)=>handleCellClick(e,row?.CNPJ ?? row?.cnpj ?? row?.id,row,index)} item={item} row={{creation:`${dateStart} - ${dateEnd}`}} index={indexItem}/>
                :
                <UserCell onClick={(e)=>handleCellClick(e,row?.CNPJ ?? row?.cnpj ?? row?.id,row,index)} labelId={labelId} row={row}/>
              )
              :
              <NormalCell key={indexItem} onClick={(e)=>handleCellClick(e,row?.CNPJ ?? row?.cnpj ?? row?.id,row,index)} item={item} row={row} index={indexItem}/>
          )
        })}
    </TableRowComponent>
  );
}

export function LoadingContent({margin=10}) {


  return (
    <div style={{margin:margin,height:350}}>
      <LinearProgress />
    </div>
  );
}

export function AddUserButton({onClick,width=165,text='Nova Empresa',icon='Add',...restProps}) {

  return (
    <ButtonContainer onClick={onClick} width={width} className={'rowCenter'}  {...restProps}>
      <Icons style={{fontSize:24,marginRight:5}} type={icon}/>
      <p  className={'noBreakText'}>{text}</p>
    </ButtonContainer>
  )
}

export function AddTextButton({onClick,initialWidth='52px',width=165,text='Nova Empresa',shortText='GHE',...restProps}) {

  return (
    <ButtonContainer initialWidth={initialWidth} onClick={onClick} width={width} className={'rowCenter'}  {...restProps}>
      <span  className={'noBreakText'}>{shortText}</span>
      <p  className={'noBreakText'}>{text}</p>
    </ButtonContainer>
  )
}

export function NoData({text='Nenhum dado cadastrado',...restProps}) {

  return (
    <NodataContainer   {...restProps}>
      <p  className={'noBreakText'}>{text}</p>
    </NodataContainer>
  )
}

export function FilterListButton({title="Filtro Avançado",dataArray=[],onClick,setFilterButton,filterButton,...restProps}) {
  const anchorRef = React.useRef(null);
  const [openFilter,setOpenFilter] = React.useState(false)
  const theme = React.useContext(ThemeContext)

  function onClose(item) {
    onClick(item)
    setOpenFilter(false)
  }

  function onClickFilterButton() {
    if (filterButton.column === 'group') setFilterButton({column:'',filter:''})
    else setOpenFilter(true)
  }

  return (
    <div ref={anchorRef} style={{marginBottom:-30,marginTop:-30}}>
      <IconButton onClick={()=>onClickFilterButton()} style={{margin:0}} aria-label="filter" icon={'FilterList'} {...restProps}/>
      <RichTooltip width={300} background={theme.palette.type === 'dark' ? 'grey' : 'light'} placement={'right-start'} anchorRef={anchorRef}  open={openFilter} setOpen={setOpenFilter} translateY={3}>
        <div style={{padding:'10px 10px'}}>
            <TitleTooltip>{title}</TitleTooltip>
          <div style={{maxHeight:300,paddingRight:3,overflowY:'scroll'}}>
            {dataArray.length > 0 ? dataArray.map((item, index) => (
                <TooltipItem onClick={()=>onClose(item)} key={item} >
                    <TextTooltip>{item}</TextTooltip>
                </TooltipItem>
              ))
            :
              <TooltipItem style={{borderStyle:'dashed'}}>
                <TextTooltip>Nenhum filtro encontrado</TextTooltip>
              </TooltipItem>
            }
          </div>
        </div>
      </RichTooltip>
    </div>
  )
}
// boxItem: {
//   cursor:'pointer',
//   display:'flex',
//   alignItems:'center',
//   padding:'12px 20px',
//   '&:hover': {
//       backgroundColor: theme.palette.background.hoverPaper
//     },
// },
// icons: {
//   color:theme.palette.primary.main,
//   fontSize:'25px',
//   marginRight:20
// },

export function FilterButton({onClick, width=78,widthTotal=195,text='Anexo 1',info='(Poeira Mineral)',...restProps}) {

  return (
    <ButtonContainerFilter onClick={onClick} width={width} widthTotal={widthTotal?widthTotal:width} className={'rowCenter'}  {...restProps}>
      <p  className={'first'}>{text}</p>
      <p  className={'noBreakText second'}>{info}</p>
    </ButtonContainerFilter>
  )
}

function StatusCell({row,item,index,onClick}) {

  return (
    <TableCellComponent onClick={onClick}/* style={{width:40}} */ align="center" >
      <BootstrapTooltip /* placement="right" */  title={row.status} styletooltip={{transform: 'translateY(5px)'}}>
        <StatusComponent status={row.status} />
      </BootstrapTooltip>
    </TableCellComponent>
  )
}

function NormalCell({row,item,index,onClick}) {
  return (
    <TableCellComponent onClick={onClick} className='noBreakText' align="left">
      {row[item.name].length > 26 ?
        <BootstrapTooltip placement="bottom"  title={row[item.name]} styletooltip={{transform: 'translateY(5px)'}}>
          <TextCell style={{marginLeft:index==0?13:0,marginRight:20,maxWidth:200}}>
            {row[item.name]}
          </TextCell>
        </BootstrapTooltip>
        :
        <TextCell style={{marginLeft:index==0?13:0,marginRight:20,maxWidth:200}}>
          {row[item.name]}
        </TextCell>
      }
    </TableCellComponent>
  )
}

function UserCell({row,labelId,onClick}) {


  return (
    <TableCellComponent onClick={onClick} component="th" id={labelId} scope="row" padding="none">
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
