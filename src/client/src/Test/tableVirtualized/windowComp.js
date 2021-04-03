import TableCell from "@material-ui/core/TableCell";
import {BootstrapTooltip} from '../../components/Main/MuiHelpers/Tooltip'
import clsx from "clsx";
import {Icons} from '../../components/Icons/iconsDashboard';
import styled, {css} from "styled-components";

const StatusComponent = styled.div`
    background-color: ${({theme})=> (theme.palette.status.fail) };
    border-radius: 10px;
    width:10px;
    height:10px;
    ${props => props.status === 'Ativo' && css`
      background-color: ${({theme})=> (theme.palette.status.success) };
    `}
    ${props => props.status === 'Aguardando Autenticação' && css`
      background-color: ${({theme})=> (theme.palette.status.orange ) };
    `}
`;

function NormalCell({column, classes, item, rowSize, onClick}) {

  return (
    <TableCell
      component="div"
      variant="body"
      align={column.align ? column.align : "left"}
      className={clsx(
        classes.cell,
        !column.width && classes.expandingCell
      )}
      style={{
        flexBasis: column.width || false,
        height: rowSize,
        minWidth:column.minWidth || false,
        marginTop:5,
        maxWidth:column.width
      }}
      onClick={onClick}
    >
      {item[column.id].length > Math.floor(23/200*column.width) ?
        <BootstrapTooltip placement="bottom-start"  title={item[column.id]} styletooltip={{transform: 'translateY(0px)'}}>
          <p className={'noBreakText'} component="div">
            {item[column.id]}
          </p>
        </BootstrapTooltip>
        :
        item[column.id]
      }
    </TableCell>
  )
}

function StatusCell({column, classes, item, rowSize, onClick}) {

  return (
    <TableCell
      component="div"
      variant="body"
      align={"center"}
      className={clsx(
        classes.cell,
        !column.width && classes.expandingCell
      )}
      style={{
        flexBasis: column.width || false,
        height: rowSize,
        maxWidth:column.width,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <BootstrapTooltip placement="bottom"  title={item[column.id]} styletooltip={{transform: 'translateY(-22px)'}}>
        <div style={{padding:30}}>
          <StatusComponent status={item[column.id]} />
        </div>
      </BootstrapTooltip>
    </TableCell>
  )
}

export function RowCell({column, classes, item, rowSize, onClick}) {

  return (
    <>
      { column.type == 'status' ?
        <StatusCell onClick={onClick} column={column} classes={classes} item={item} rowSize={rowSize}/>
      :
        <NormalCell onClick={onClick} column={column} classes={classes} item={item} rowSize={rowSize}/>
      }
    </>
  )
}
