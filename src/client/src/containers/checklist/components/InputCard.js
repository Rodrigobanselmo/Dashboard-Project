import React, { useState } from 'react';
import { Paper, InputBase } from '@material-ui/core';
import {BootstrapTooltip} from '../../../components/Main/MuiHelpers/Tooltip'
import {Icons} from '../../../components/Icons/iconsDashboard';
import { makeStyles, fade } from '@material-ui/core/styles';
import IconButton from '../../../components/Main/MuiHelpers/IconButton';

const useStyle = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(2),
    marginRight:10,
    boxShadow: `1px 1px 1px 1px rgba(0,0,0,0.22)`,
    borderRadius:6,
    flex:1,
    backgroundColor:theme.palette.type !== 'dark' ? fade(theme.palette.background.default,0.3) : theme.palette.background.contrast
  },
  input: {
    margin: theme.spacing(1),
  },
}));
export function InputCard({initialValue='',title, setTitle,onBlurTextEditSave,inputProps,onSetSubText,more,minus,...props}) {
  const classes = useStyle();
  const [oldValue, setOldValue] = useState(initialValue);

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const onFocus = (e) => {
    if (title=='...') {
      setTitle('')
      setOldValue('...')
    }
  };

  return (
    <div style={{position:'relative'}}>
      <div className={classes.card} {...props}>
        <InputBase
          onChange={handleOnChange}
          multiline
          onBlur={() => onBlurTextEditSave(title,setTitle,oldValue, setOldValue)}
          onFocus={onFocus}
          fullWidth
          inputProps={{
            className: classes.input,
          }}
          value={title == '...'?'':title}
          placeholder={more?'Informação adicional...':'Insira sua pergunta...'}
          {...inputProps}
        />
      </div>
      {!more &&
      <div style={{position:'absolute',bottom:3,right:19}}>
        <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:500, exit: 50} }} title={minus?'Remover Informação complementar':'Gerar Informação complementar'} styletooltip={{transform: 'translateX(0px)'}}>
            <div>
              <IconButton style={{height:12,width:12,marginRight:-8,opacity:0.7}} iconProps={{style:{fontSize:12}}} onClick={onSetSubText} aria-label="Add" icon={minus?'Remove':'Add'}/>
            </div>
        </BootstrapTooltip>
      </div>
      }
    </div>
  );
}
