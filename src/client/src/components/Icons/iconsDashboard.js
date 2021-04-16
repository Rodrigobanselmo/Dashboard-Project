import React from 'react';
import History from '@material-ui/icons/History';
import CloudDownload from '@material-ui/icons/CloudDownload';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftOutlinedIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import Cancel from '@material-ui/icons/Cancel';
import Close from '@material-ui/icons/Close';
import HighlightOff from '@material-ui/icons/HighlightOff';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Build from '@material-ui/icons/Build';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Mail from '@material-ui/icons/Mail';
import Notifications from '@material-ui/icons/Notifications';
import Help from '@material-ui/icons/Help';
import Error from '@material-ui/icons/Error';
import RestorePage from '@material-ui/icons/RestorePage';
import Storage from '@material-ui/icons/StorageTwoTone';
import Business from '@material-ui/icons/BusinessTwoTone';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
// import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Apps from '@material-ui/icons/Apps';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import Edit from '@material-ui/icons/Edit';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AllOut from '@material-ui/icons/AllOut';
import FilterList from '@material-ui/icons/FilterList';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import Facebook from '@material-ui/icons/Facebook';
import YouTube from '@material-ui/icons/YouTube';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Twitter from '@material-ui/icons/Twitter';
import Instagram from '@material-ui/icons/Instagram';

import OfflineBoltTwoToneIcon from '@material-ui/icons/OfflineBoltTwoTone';
// import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ReactComponent as Logo } from './info.svg';
import { ReactComponent as Fis } from './risk/fis.svg';
import { ReactComponent as Qui } from './risk/qui.svg';
import { ReactComponent as Bio } from './risk/bio.svg';
import { ReactComponent as Aci } from './risk/aci.svg';
import { ReactComponent as Erg } from './risk/erg.svg';

import LottieAnimation from '../../lib/lottie';
// import { AiOutlineClose } from 'react-icons/ai';
// import { BsCheckCircle,BsExclamationTriangle,BsXOctagon,BsInfoCircle } from 'react-icons/bs';

/* interface SvgIcons extends SvgIconProps {
  type: string;
  color: string;
  styles: any;
}
export const Icons: React.FC<SvgIcons | any> = ({ type, ...props }) => { */

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Icons = ({ type, ...props }) => {
  switch (type) {
    case 'Twitter':
      return <Twitter {...props} />;
    case 'Instagram':
      return <Instagram {...props} />;
    case 'LinkedIn':
      return <LinkedIn {...props} />;
    case 'YouTube':
      return <YouTube {...props} />;
    case 'Facebook':
      return <Facebook {...props} />;

    case 'Menu':
      return <MenuOutlinedIcon {...props} />;
    case 'MenuOpen':
      return <MenuOpenOutlinedIcon {...props} />;

    case 'Check':
      return <CheckCircleOutlineIcon {...props} />;
    case 'Warn':
      return <ReportProblemOutlinedIcon {...props} />;
    case 'Error':
      return <ErrorOutlineRoundedIcon {...props} />;
    case 'Info':
      return (<Logo style={{marginTop:3,opacity:0.7,cursor:'pointer'}} height="20px" width="20px"  {...props}/>);
    case 'InfoShade':
      return (<Logo style={{marginTop:3,opacity:0.4,cursor:'pointer'}} height="20px" width="20px"  {...props}/>);

    case 'Fis':
      return (<Fis  height="20px" width="20px"  {...props}/>);
    case 'Qui':
      return (<Qui  height="20px" width="20px" {...props} />);
    case 'Bio':
      return (<Bio  height="20px" width="20px"  {...props}/>);
    case 'Erg':
      return (<Erg  height="20px" width="20px"  {...props}/>);
    case 'Aci':
      return (<Aci  height="20px" width="20px" {...props} />);


    case 'Administrative':
      return <FileCopyIcon {...props} />;
    case 'RH':
      return <RecordVoiceOverIcon {...props} />;
    case 'Technician':
      return <Build {...props} />;
    case 'Engineer':
      return <SettingsIcon {...props} />;
    case 'Admin':
      return <SupervisorAccountIcon {...props} />;

    case 'Storage':
      return <Storage {...props} />;
    case 'Business':
      return <Business {...props} />;
    case 'Apps':
      return <Apps {...props} />;

    case 'History':
      return <History {...props} />;
    case 'CloudDownload':
      return <CloudDownload {...props} />;
    case 'ExitToApp':
      return <ExitToApp {...props} />;
    case 'Group':
      return <Group {...props} />;
    case 'Person':
      return <Person {...props} />;
    case 'KeyboardArrowRightIcon':
      return <KeyboardArrowRightIcon {...props} />;
    case 'KeyboardArrowLeft':
      return <KeyboardArrowLeftOutlinedIcon {...props} />;
    case 'ArrowForward':
      return <ArrowForwardOutlinedIcon {...props} />;
    case 'KeyboardArrowDownIcon':
      return <KeyboardArrowDownIcon {...props} />;
    case 'ArrowDrop':
      return <ArrowDropDownIcon {...props} />;
    case 'Add':
      return <Add {...props} />;
    case 'Search':
      return <Search {...props} />;
    case 'Cancel':
      return <Cancel {...props} />;
    case 'Close':
      return <Close {...props} />;
    case 'HighlightOff':
      return <HighlightOff {...props} />;
    case 'ArrowBack':
      return <ArrowBack {...props} />;
    case 'Notifications':
      return <Notifications {...props} />;
    case 'Mail':
      return <Mail {...props} />;
    case 'RestorePage':
      return <RestorePage {...props} />;
    case 'Edit':
      return <Edit {...props} />;
    case 'Archive':
      return <ArchiveOutlinedIcon {...props} />;
    case 'Unarchive':
      return <UnarchiveOutlinedIcon {...props} />;
    case 'AllOut':
      return <AllOut {...props} />;
    case 'Risk':
      return <OfflineBoltTwoToneIcon {...props} />;
    case 'FilterList':
      return <FilterList {...props} />;
    case 'Checklist':
      return <AssignmentTurnedInRoundedIcon {...props} />;
    case 'dotsHorizontal':
      return <MoreHorizRoundedIcon {...props} />;
    case 'dotsVertical':
      return <MoreVertRoundedIcon {...props} />;
    case 'Camera':
      return <CameraAltOutlinedIcon {...props} />;
    case 'Mandatory':
      return <PriorityHighIcon {...props} />;

    case 'Errors':
      return <Error {...props} />;
    case 'Help':
      return <Help {...props} />;
    case 'Video':
      return <VideoLibrary {...props} />;

    case 'Load':
      return (
        <div {...props}>
          <LottieAnimation
            lotti="loader"
            height={30}
            width={30}
            isClickToPauseDisabled
          />
        </div>
      );
    default:
      return <Close {...props} />;
  }
};
