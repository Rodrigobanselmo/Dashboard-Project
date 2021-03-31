
import React, { useState,useContext } from "react";
import { lighten } from '@material-ui/core/styles';
import {Icons} from '../../Icons/iconsDashboard';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import styled, {ThemeContext} from "styled-components";
import { isNumber } from "lodash";

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
  margin-top:5px;
  text-align: left;
  color: ${({theme})=>theme.palette.text.secondary};
`;

const DropDownHeader = styled.div`
  margin-bottom: 10px;
  padding: 9px 15px;
  font-size: 16px;
  border: ${({theme,open})=>!open ? '1px':'2px'} solid ${({theme,open})=>!open ? theme.palette.text.third:theme.palette.primary.main};
  color: ${({selected,theme})=>selected ? theme.palette.text.primary : theme.palette.text.secondary};
  border-radius:6px;


`;

const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  text-align: center;
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
/*   &:first-child {
    padding-top: 0.8em;
  } */
`;

const ListItem = styled.li`
  list-style: none;
  align-items:center;
  justify-content: center;
  border-bottom: 1px solid ${({theme})=>theme.palette.background.line};
  padding: 8px;
  border-radius:6px;

  &:hover {
    background-color: ${({theme})=>lighten(theme.palette.background.paper,0.03)};
  }
`;


export function Menu({options=[],onSelect,placeholder='Selecione',defaultValue,defaultValueIndex}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.length == 1 ? options[0] : defaultValueIndex ? options[defaultValueIndex] : defaultValue);

  const toggling = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    onSelect(selectedOption)
  }, [selectedOption])

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={()=>setIsOpen(false)}>
      <DropDownContainer>
        <LabelText >Tipo</LabelText>
        <DropDownHeader open={isOpen} selected={options.findIndex(i=>i=selectedOption) != -1} onClick={toggling}>
          {selectedOption || placeholder}
        {options.length >= 2 && <Icons style={{fontSize:30,position: 'absolute',top:6,right:5,}}  type={`ArrowDrop`}/>}
        </DropDownHeader>
        {options.length >= 2 && isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </ClickAwayListener>
  );
}
