import React, { useState,memo,useCallback } from 'react'
import styled, { keyframes } from "styled-components";
const Key = keyframes`


from {
  opacity:0;
} 
to {
  opacity:1;
}


`;

const StyledComp = styled.ul`
  color:red;
  transform: ${({prop})=>(`scale(${prop})`)};
  transition: all 2s ease;
  animation: ${Key} 2s linear;
  &:hover{
    color:green;
  }
`;


const itemsList = [
    {
      name: "Perfil",
      icon: 'Person',
      id:'5',
    },
    {
        name: "Históricos",
      icon: 'History',
      id:'4',
    },
    {
        name: "Documento",
      icon: 'CloudDownload',
      id:'3',
    },
    {
        name: "Equipe",
      icon: 'Group',
      id:'2',
    },
    {
        name: "Login",
      icon: 'ExitToApp',
      id:'1',
    }
  ];

  
  

    const AddItemButton = React.memo(({ onClick }) => {
        // Goal is to make sure this gets printed only once
        console.error('Button Rendered!');
        return <button onClick={onClick}>Add Item</button>;
      });
    const Map = React.memo(({ handleClick,item }) => {
        const [items, setItems] = useState([]);

          function setItemsYes(params) {
            setItems(Math.random())
          }
        // Goal is to make sure this gets printed only once
        return <StyledComp prop={items} onClick={()=>setItemsYes()} >{item}</StyledComp>
      });
      
    const App = () => {
        const [items, setItems] = useState([]);
        const [state, setState] = useState([]);
      
        const addItem = useCallback(() => {
            setItems(items => [...items, Math.random()]);
          }, []);

        const handleClick = useCallback(id => {
            setItems(items => items.filter(c => c !== id));
        }, []);
        const onState = () => {
            setState(Math.random())
        };
      
        return (
          <div>
            <AddItemButton onClick={addItem} />
            <AddItemButton onClick={onState} />
            <ul>
              {items.map(item => <Map key={item} item={item} handleClick={handleClick}/>)}
            </ul>
          </div>
        );
    }
    export default App
