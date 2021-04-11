import React, { useState } from 'react';
import { Paper, InputBase } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

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
export function InputCard({initialValue='',onBlurTextEditSave,...props}) {
  const classes = useStyle();
  const [title, setTitle] = useState(initialValue);

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <div className={classes.card} {...props}>
        <InputBase
          onChange={handleOnChange}
          multiline
          onBlur={() => onBlurTextEditSave(title)}
          fullWidth
          inputProps={{
            className: classes.input,
          }}
          value={title}
          placeholder={'Insira sua pergunta...'}
        />
      </div>
    </div>
  );
}
