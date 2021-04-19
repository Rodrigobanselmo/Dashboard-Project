
import React, { useState,useContext } from "react";
import {Icons} from '../../Icons/iconsDashboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import styled, {ThemeContext,css} from "styled-components";
import { lighten,darken,fade } from "@material-ui/core/styles";
import { isNumber } from "lodash";
import {BootstrapTooltip} from '../../Main/MuiHelpers/Tooltip'

const LabelText = styled.p`
  position:absolute;
  font-size:12px;
  top:-8px;
  left:8px;
  padding: 0px 5px;
  background-color:${({theme})=>lighten(theme.palette.background.paper,0.058)};
`;


const DropDownContainer = styled.div`
  width: 100%;
  position:relative;
  text-align: left;
  color: ${({theme})=>theme.palette.text.secondary};

`;

const DropDownHeader = styled.div`
  cursor: pointer;
  padding: 9px 15px;
  font-size: 16px;
  border: ${({theme,open})=>!open ? '1px':'2px'} solid ${({theme,open})=>!open ? theme.palette.text.third:theme.palette.primary.main};
  color: ${({selected,theme})=>selected ? theme.palette.text.primary : theme.palette.text.secondary};
  border-radius:6px;

  ${props => props.type == 'box' && css`
    border:none;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);
    background-color:${({theme})=>theme.palette.type !== 'dark' ? fade(theme.palette.background.default,0.3) : theme.palette.background.contrast};
    color: ${({selected,theme})=>selected ? theme.palette.type !== 'dark' ? fade(theme.palette.text.secondary,0.8): theme.palette.text.secondary : theme.palette.text.third};
  `}
`;

const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  text-align: center;
  transform:translateY(10px);
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background-color:${({theme})=>lighten(theme.palette.background.paper,0.058)};
  border: 1px solid ${({theme})=>theme.palette.text.third};
  border-radius:5px;
  color: ${({theme})=>theme.palette.text.primary};
  font-size: 16px;
  font-weight: 500;

    ${props => props.type == 'box' && css`
    font-size:0.92rem;
    font-weight: normal;
    border:none;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.22);
    background-color:${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.background.default,0.76) : darken(theme.palette.background.contrast,0.1)};
    color: ${({theme})=> theme.palette.type !== 'dark' ? fade(theme.palette.text.secondary,0.8): theme.palette.text.secondary};
  `}
/*   &:first-child {
    padding-top: 0.8em;
  } */
`;

const ListItem = styled.li`
  position:relative;
  list-style: none;
  align-items:center;
  justify-content: center;
  border-bottom: 1px solid ${({theme})=>theme.palette.background.line};
  padding: 8px;
  border-radius:6px;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  &:hover {
    background-color: ${({theme})=>lighten(theme.palette.background.paper,0.03)};
  }

  ${props => props.type == 'box' && css`
    border-radius:0px;
    cursor: pointer;
    &:hover {
      background-color:${({theme})=>theme.palette.type !== 'dark' ? lighten(theme.palette.background.default,0.5) : darken(theme.palette.background.contrast,0.2)};
    }
  `}
`;


export function Menu({options=[],type='',headerStyle={},listStyle={},itemStyle={},label='Tipo',onSelect,placeholder='Selecione',defaultValue,defaultValueIndex,...props}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.length == 1 ? options[0] : defaultValueIndex ? options[defaultValueIndex] : defaultValue);

  const toggling = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    onSelect(selectedOption)
  }, [selectedOption])

  React.useEffect(() => {
    setSelectedOption(defaultValue)
  }, [defaultValue])

  const onOptionClicked = (value,index) => () => {
    setSelectedOption(value,index);
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={()=>setIsOpen(false)}>
      <DropDownContainer type={type} {...props}>
        {label && <LabelText >{label}</LabelText>}
        <DropDownHeader type={type} style={headerStyle} open={isOpen} selected={options.findIndex(i=>i=selectedOption) != -1} onClick={toggling}>
          {selectedOption || placeholder}
        {options.length >= 2 && <Icons style={{fontSize:30,position: 'absolute',top:6,right:5,}}  type={`ArrowDrop`}/>}
        </DropDownHeader>
        {options.length >= 2 && isOpen && (
          <DropDownListContainer>
            <DropDownList type={type} style={listStyle}>
              {options.map((option,index) => (
                <ListItem type={type} style={itemStyle} onClick={onOptionClicked(option?.text ?? option,index)} key={index}>
                  {option?.text ?? option}
                  {option?.tooltip &&
                    <BootstrapTooltip
                    placement="bottom"
                    TransitionProps={{ timeout: {enter:500, exit: 50} }}
                    title={option.tooltip}
                    styletooltip={{transform: 'translateY(0px)'}}
                    >
                    <div>
                      <Icons style={{fontSize:30,position: 'absolute',top:4,right:5,}} height={12} width={12} type={`Info`}/>
                    </div>
                  </BootstrapTooltip>
                  }
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </ClickAwayListener>
  );
}
