import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styled from "styled-components";
import {Icons} from '../../Icons/iconsDashboard'

const Icon = styled(Icons)`
  font-size: 30px;
  border-radius:4px;
  color: ${({theme})=>theme.palette.text.secondary};
  cursor: pointer;

  &:hover {
    color:${({theme})=>theme.palette.text.primary};
  }

  &:active {
    color:${({theme})=>theme.palette.text.third};;
  }
`;

export default function IconButtonMui({icon='Close',iconColor, ...restProps }) {
    return (
        <IconButton {...restProps}>
            <Icon  type={icon} />
        </IconButton>
    );
}
