import React from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import { CardChecklistContainer,IconsArrowCard } from '../styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from '../func'
import {CardEdit} from './CardEdit'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Draggable } from 'react-beautiful-dnd';


//////import {useLoaderDash} from '../../../context/LoadDashContext'

export function Card({open,setOpen,item,onClickEdit=()=>{},disableDel,disableEdit,disableDup,title,position,fixedHeight,button,...props}) {
  const anchorRef = React.useRef(null);

  function onRightClick(event) {
    event && event?.preventDefault && event.preventDefault();
    if (setOpen) setOpen(item.id)
  }

  return (
      <CardChecklistContainer onContextMenu={onRightClick} ref={anchorRef} button={button} fixedHeight={fixedHeight} position={position} {...props}>
        <p >
          {title}
        </p>
        {position &&
          <IconsArrowCard style={{fontSize:22}} type={`KeyboardArrowRightIcon`}/>
        }
        { setOpen &&
          <CardEdit item={item} onClick={onClickEdit} open={open===item.id} setOpen={setOpen} disableDup={disableDup}  disableEdit={disableEdit}  disableDel={disableDel} anchorRef={anchorRef}/>
        }
      </CardChecklistContainer>
  );
}



