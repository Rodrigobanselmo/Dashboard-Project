import TableCell from "@material-ui/core/TableCell";
import {BootstrapTooltip} from '../MuiHelpers/Tooltip'
import clsx from "clsx";
import {Icons} from '../../Icons/iconsDashboard';
import styled, {css} from "styled-components";
import {NormalizeData} from '../../../helpers/DataHandler';

const StatusComponent = styled.div`
    background-color: ${({theme})=> (theme.palette.status.success) };
    border-radius: 10px;
    width:10px;
    height:10px;
    ${props => (props.status === 'none' || props.status === 'Não') && css`
      background-color: ${({theme})=> (theme.palette.status.fail) };
      /* background-color: ${({theme})=> (theme.palette.status.success) }; */
    `}
    ${props => (props.status === 'Aguardando Autenticação'/*  || props.status === 'Não' */) && css`
      background-color: ${({theme})=> (theme.palette.status.orange ) };
    `}
`;

function NormalCell({column, classes, item, rowSize, onClick, onCorrectData,colIndex}) {

  let ItemToShow = onCorrectData?onCorrectData(column.id,item[column.id],item):item[column.id]

  var SplitItem = [];
  if (column.type=='double') {
    SplitItem = ItemToShow && typeof ItemToShow === 'string' ? ItemToShow.split('/') : ['- - -'];
  } else {
    SplitItem = [ItemToShow ? ItemToShow : '- - -']
  }
  return (
    <TableCell
      component="div"
      className={clsx(
        classes.cell,
        !column.width && classes.expandingCell,
      )}
      style={{
        flex:column.flex || false,
        height: rowSize,
        minWidth:column.minWidth || false,
        display:'flex',
        justifyContent: column.align ? column.align : 'flex-start',
        position:'relative',
        alignItems:'center',
        //transform: column.align === 'center' ? `translateX(${10}px)`:`translateX(0px)`,
        //backgroundColor:colIndex ==0?'grey':colIndex ==1?'green':colIndex ==2?'red':colIndex ==3?'blue':colIndex ==4?'orange':colIndex ==4?'yellow':colIndex ==4?'black':'transparent',
      }}
      onClick={onClick}
    >
      <div style={{position:'absolute',width:'85%'}}>
      {(ItemToShow ? ItemToShow.length : 0) > Math.floor(26/200*column.minWidth) ?
        <BootstrapTooltip placement="bottom-start"  title={ItemToShow} styletooltip={{transform: 'translateY(0px)'}}>
          <p style={{height:'fit-content',textAlign:column.align  ? column.align : "left"}} className={'noBreakText'} >
          {ItemToShow}
          </p>
        </BootstrapTooltip>
        :
        <p style={{height:'fit-content',textAlign:column.align  ? column.align : "left",}} className={'noBreakText'} >
          {SplitItem[0]}
          {SplitItem[1] ?
            <>
              <br/>
              {SplitItem[1]}
            </>
          :null}
        </p>
      }
      </div>
    </TableCell>
  )
}

function Paragraph({column, classes, item, rowSize, onClick, colIndex}) {

  let ItemToShow = item[column.id]
  var SplitItem = [];
  if (column.type=='double') {
    SplitItem = ItemToShow && typeof ItemToShow === 'string' ? ItemToShow.split('/') : '- - -'.split('/') ;
  } else {
    SplitItem = [ItemToShow]
  }
  return (
    <TableCell
      component="div"
      className={clsx(
        classes.cell,
        !column.width && classes.expandingCell,
      )}
      style={{
        flex:column.flex || false,
        height: rowSize,
        minWidth:column.minWidth || false,
        display:'flex',
        justifyContent: column.align ? column.align : 'flex-start',
        position:'relative',
        alignItems:'center',
        //transform: column.align === 'center' ? `translateX(${10}px)`:`translateX(0px)`,
        //backgroundColor:colIndex ==0?'grey':colIndex ==1?'green':colIndex ==2?'red':colIndex ==3?'blue':colIndex ==4?'orange':colIndex ==4?'yellow':colIndex ==4?'black':'transparent',
      }}
      onClick={onClick}
    >
      <div style={{position:'absolute',width:'85%'}}>
      {(ItemToShow ? ItemToShow.length : 0) > Math.floor(26/200*column.minWidth) ?
        <BootstrapTooltip placement="bottom-start"  title={ItemToShow} styletooltip={{transform: 'translateY(0px)'}}>
          <p style={{height:'fit-content',textAlign:column.align  ? column.align : "left",textOverflow: 'ellipsis',WebkitBoxOrient: 'vertical',WebkitLineClamp:2, display: '-webkit-box',overflow:'hidden'}} >
          {ItemToShow}
          </p>
        </BootstrapTooltip>
        :
        <p style={{height:'fit-content',textAlign:column.align  ? column.align : "left",textOverflow: 'ellipsis',WebkitLineClamp:2, display: '-webkit-box',overflow:'hidden'}} >
          {ItemToShow ? ItemToShow : '- - -'}
        </p>
      }
      </div>
    </TableCell>
  )
}

function StatusCell({column, classes, item, rowSize, onClick,colIndex}) {

  let ItemToShow = item[column.id]
  function setTitle() {
    if (ItemToShow == 'Sim') return 'Dado padrão do sistema, previamente cadastrado pela SimpleSST conforme legislação e/ou norma técnica.'
    if (ItemToShow == 'Não') return 'Dado criado pela equipe de sua empresa.'
    if (Array.isArray(ItemToShow) && ItemToShow.length>0 && column.id == 'rec') return 'Possui Medida de controle equivalente a recomendação em questão.'
    if (Array.isArray(ItemToShow) && ItemToShow.length>0 && column.id == 'med') return 'Possui recomendação equivalente a Medida de controle em questão.'
    if (typeof ItemToShow == 'string') return ItemToShow
    return 'Não identificado'
  }
  return (
    <TableCell
      component="div"
      variant="body"
      align={"center"}
      className={clsx(
        classes.cell,
        !column.width && classes.expandingCell,
      )}
      style={{
        display:'flex',
        flex:column.flex|| false,
        minWidth:column.minWidth || false,
        height: rowSize,
        display:'flex',
        alignItems:'center',
        justifyContent: column.align ? column.align : 'flex-start',
      }}
      onClick={onClick}
    >
      <BootstrapTooltip placement="bottom"  title={setTitle()} styletooltip={{transform: 'translate(0px,-22px)'}}>
        <div style={{padding:30,paddingLeft:30}}>
          <StatusComponent status={ItemToShow ? ItemToShow : 'none'} />
        </div>
      </BootstrapTooltip>
    </TableCell>
  )
}

export function RowCell({column, classes, item, rowSize, onClick,colIndex,onCorrectData}) {

  if (column.type === 'start/end') {
    var dateStart = item?.creation  && item.creation  && item.creation !== 0 ? NormalizeData(new Date(item.creation),'normal') : 'Indisponível';
    var dateEnd = item?.end  && item.end  && item.end !== 0 ? NormalizeData(new Date(item.end),'normal') : 'Presente';
  }
  return (
    <>
      { column.type == 'status' ?
        <StatusCell colIndex={colIndex} onClick={onClick} column={column} classes={classes} item={item} rowSize={rowSize}/>
      :
        column.type === 'start/end' ?
        <NormalCell onCorrectData={onCorrectData} colIndex={colIndex} onClick={onClick} column={column} classes={classes} item={{creation:`${dateStart} - ${dateEnd}`}} rowSize={rowSize}/>
      :
        column.type === 'paragraph' ?
        <Paragraph colIndex={colIndex} onClick={onClick} column={column} classes={classes} item={item} rowSize={rowSize}/>
      :
        <NormalCell onCorrectData={onCorrectData} colIndex={colIndex} onClick={onClick} column={column} classes={classes} item={item} rowSize={rowSize}/>
      }
    </>
  )
}
