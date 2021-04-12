import React from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import { CardChecklistContainer,CardContainerRisk,IconsArrowCard } from '../styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from '../func'
import {CardEdit} from './CardEdit'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import { Draggable } from 'react-beautiful-dnd';
import useDraggableInPortal from '../../../hooks/useDraggableInPortal'


//////import {useLoaderDash} from '../../../context/LoadDashContext'

export function RiskDrop({open,setOpen,item,title,position,fixedHeight,index,...props}) {
  const anchorRef = React.useRef(null);
  const renderDraggable = useDraggableInPortal();

  function onRightClick(event) {
    event && event?.preventDefault && event.preventDefault();
    //setOpen(item.id)
  }

  return (
        <Draggable draggableId={item.id} index={index}>
        {renderDraggable((provided) => (
          <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
            <CardContainerRisk style={{cursor:'grab'}} onContextMenu={onRightClick} ref={anchorRef} fixedHeight={fixedHeight} position={position} {...props}>
              <p >
                {title}
              </p>
              {position &&
                <IconsArrowCard style={{fontSize:22}} type={`KeyboardArrowRightIcon`}/>
              }
              {/* <CardEdit open={open===item.id} setOpen={setOpen} anchorRef={anchorRef}/> */}
            </CardContainerRisk>
          </div>
        ))}
      </Draggable>
  );
}



