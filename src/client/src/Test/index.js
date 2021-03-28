import React from 'react';
import Tree from 'react-tree-graph';
import './style.css';
const App = () => {
  let data = {
    name: 'Parent',
    text: 'key One',
      children: [{
      name: 'Child One',
      text: 'key One',
        children: [{
          name: 'Child One1s',
          text: 'key One',
        }, {
          name: 'Child Two',
          text: 'key One',
        }, {
          name: 'Child trew',
          text: 'key One',
        }, {
          name: 'Child trew',
          text: ' key One',
        }, {
          name: 'Child trew',
          text: 'key One',
        }, {
          name: 'Child trew',
          text: 'key One',
        }]
      }, {
      name: 'Child Two',
        text: 'key One',
    }, {
      name: 'Child trew',
        text: 'key One',
    }, {
      name: 'Child trew',
        text: 'key One',
    }, {
      name: 'Child trew',
        text: 'key One',
    }, {
      name: 'Child trew',
      text: 'key One',
      svgProps:{style: {fill:'red'}}
    }]
  };

  function onClick(event, nodeKey) {
    alert(`Left clicked ${nodeKey}`);
  }

  function onRightClick(event, nodeKey) {
    event.preventDefault();
    alert(`Right clicked ${nodeKey}`);
  }



  return (
    <div style={{backgroundColor:'#ddd'}}>
      <div className="custom-container">
        <Tree
          svgProps={{
            className: 'custom',
          }}
          gProps={{
            onClick: onClick,
            onContextMenu: onRightClick
          }}
          data={data}
          labelProp='text'
          height={500}
          width={700}
          animated
          textProps={{
            transform:'translate(5)'
          }}
        >
          <text
            dy="15"
            dx="5"
            stroke="#ffff"
            fill="#ffff">
            Custom Title
          </text>
        </Tree>
      </div>
    </div>
  );
};
export default App;
