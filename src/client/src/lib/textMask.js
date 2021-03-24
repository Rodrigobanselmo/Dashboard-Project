import NumberFormat from 'react-number-format';

export function NumberFormatOnly(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator={'.'}
        decimalSeparator={','}
        decimalScale={0}
        isNumericString
      />
    );
  }

export function NumberFormatCNPJ(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="##.###.###/####-##"
        isNumericString
      />
    );
  }
export function NumberFormatCell(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="(##) #####-####"
        isNumericString
        mask="_"
      />
    );
  }

  export function NumberFormatTel(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="(##) ####-####"
        isNumericString
        mask="_"
      />
    );
  }

export function NumberFormatCEP(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="##.###-###"
        isNumericString
/*         prefix="$" */
      />
    );
  }
export function NumberFormatCNAE(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="##.##-#-##"
        isNumericString
        allowLeadingZeros
/*         prefix="$" */
      />
    );
  }

  export function NumberFormatCPF(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="##.###.###/####-##"
        isNumericString
        prefix="$"
      />
    );
  }
