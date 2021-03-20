import React from 'react';
import MaskedInput from 'react-text-mask';
/* import NumberFormat from 'react-number-format'; */
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const InputMain = withStyles((theme) => ({
  root: {
      border: `2px ${theme.palette.background.line} solid`,
      color: theme.palette.text.contrastWhite,
      paddingLeft:10,
  },
}))((props) => <Input {...props} />);

const FormControlMain = withStyles((theme) => ({
  root: {
      marginBottom:10,
  },
}))((props) => <FormControl {...props} />);

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export default function FormattedInputs() {
  const [values, setValues] = React.useState({
    textmask: '(1  )    -    ',
    numberformat: '1320',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
      <FormControlMain>
        <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
        <InputMain
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControlMain>
  );
}