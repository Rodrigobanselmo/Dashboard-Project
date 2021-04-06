import TableCell from "@material-ui/core/TableCell";
import {BootstrapTooltip} from '../MuiHelpers/Tooltip'
import clsx from "clsx";
import {Icons} from '../../Icons/iconsDashboard';
import styled, {css} from "styled-components";
import {NormalizeData} from '../../../helpers/DataHandler';

const StatusComponent = styled.div`
    background-color: ${({theme})=> (theme.palette.status.fail) };
    border-radius: 10px;
    width:10px;
    height:10px;
    ${props => (props.status === 'Ativo' || props.status === 'Sim') && css`
      background-color: ${({theme})=> (theme.palette.status.success) };
    `}
    ${props => (props.status === 'Aguardando Autenticação' || props.status === 'Não') && css`
      background-color: ${({theme})=> (theme.palette.status.orange ) };
    `}
`;

function NormalCell({column, classes, item, rowSize, onClick, colIndex}) {

  var SplitItem = [];
  if (column.type=='double') {
    SplitItem = item[column.id] && typeof item[column.id] === 'string' ? item[column.id].split('/') : '- - -'.split('/') ;
  } else {
    SplitItem = [item[column.id] ? item[column.id] : '- - -']
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
      {(item[column.id] ? item[column.id].length : 0) > Math.floor(26/200*column.minWidth) ?
        <BootstrapTooltip placement="bottom-start"  title={item[column.id]} styletooltip={{transform: 'translateY(0px)'}}>
          <p style={{height:'fit-content',textAlign:column.align  ? column.align : "left"}} className={'noBreakText'} >
          {item[column.id]}
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

  var SplitItem = [];
  if (column.type=='double') {
    SplitItem = item[column.id] && typeof item[column.id] === 'string' ? item[column.id].split('/') : '- - -'.split('/') ;
  } else {
    SplitItem = [item[column.id]]
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
      {(item[column.id] ? item[column.id].length : 0) > Math.floor(26/200*column.minWidth) ?
        <BootstrapTooltip placement="bottom-start"  title={item[column.id]} styletooltip={{transform: 'translateY(0px)'}}>
          <p style={{height:'fit-content',textAlign:column.align  ? column.align : "left",textOverflow: 'ellipsis',WebkitBoxOrient: 'vertical',WebkitLineClamp:2, display: '-webkit-box',overflow:'hidden'}} >
          {item[column.id]}
          </p>
        </BootstrapTooltip>
        :
        <p style={{height:'fit-content',textAlign:column.align  ? column.align : "left",textOverflow: 'ellipsis',WebkitLineClamp:2, display: '-webkit-box',overflow:'hidden'}} >
          {item[column.id] ? item[column.id] : '- - -'}
        </p>
      }
      </div>
    </TableCell>
  )
}

function StatusCell({column, classes, item, rowSize, onClick,colIndex}) {

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
      <BootstrapTooltip placement="bottom"  title={item[column.id] ? (item[column.id] === 'Sim' ? 'Dado padrão do sistema, previamente cadastrado pela SimpleSST conforme legislação e/ou norma técnica.' : item[column.id]):'Não identificado'} styletooltip={{transform: 'translate(0px,-22px)'}}>
        <div style={{padding:30,paddingLeft:30}}>
          <StatusComponent status={item[column.id] ? item[column.id] : 'none'} />
        </div>
      </BootstrapTooltip>
    </TableCell>
  )
}

export function RowCell({column, classes, item, rowSize, onClick,colIndex}) {

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
        <NormalCell colIndex={colIndex} onClick={onClick} column={column} classes={classes} item={{creation:`${dateStart} - ${dateEnd}`}} rowSize={rowSize}/>
      :
        column.type === 'paragraph' ?
        <Paragraph colIndex={colIndex} onClick={onClick} column={column} classes={classes} item={item} rowSize={rowSize}/>
      :
        <NormalCell colIndex={colIndex} onClick={onClick} column={column} classes={classes} item={item} rowSize={rowSize}/>
      }
    </>
  )
}
