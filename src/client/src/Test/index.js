import React from 'react';
import JSZip from 'jszip';
import firebase from 'firebase/app';
import { saveAs } from 'file-saver';

const App = () => {

  const tree = {
    timestamp: '08/02/2021 11:00',
    name: 'Colour',
    children: [{
      name: 'Black',
      children: []
    }, {
      name: 'Blue',
      children: [{
        name: 'Aquamarine',
        children: []
      }, {
        name: 'Cyan',
        children: []
      }, {
        name: 'Navy',
        children: []
      }, {
        name: 'Turquoise',
        children: []
      }]
    }, {
      name: 'Green',
      children: []
    }, {
      name: 'Purple',
      children: [{
        name: 'Indigo',
        children: []
      }, {
        name: 'Violet',
        children: []
      }]
    }, {
      name: 'Red',
      children: [{
        name: 'Crimson',
        children: []
      }, {
        name: 'Maroon',
        children: []
      }, {
        name: 'Scarlet',
        children: []
      }]
    }, {
      name: 'White',
      children: []
    }, {
      name: 'Yellow',
      children: []
    }]
  };
  const [filter, setFilter] = React.useState('blue')
  const [data, setData] = React.useState(tree)

  const buildSubTree = (root) => {

		let newChildren = [];

		for (let i = 0; i < root.children.length; i++) {
			let child = buildSubTree(root.children[i]);
			if (child) {
				newChildren.push(child);
			}
		}

		if (newChildren.length > 0) {
			root.children = newChildren;
		}

		if (newChildren.length > 0 || root.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
			return root;
		}
		return null;
	}

	const setClassName = (node) => {
		node.children.forEach(setClassName);

		if (!filter) {
			return;
		}

		node.className = node.name.toLowerCase().indexOf(filter) === -1
			? 'node searchExcluded'
			: 'node searchIncluded';
	}


		let root = data;

		root = {...root};

		if (filter) {
			root = buildSubTree(root) || root;
		}

		setClassName(root);

    console.log(root,'root')

  return (
    <div style={{}}>
      <button onClick={()=>{}}>Teste</button>
      <img src="https://firebasestorage.googleapis.com/v0/b/react-dashboard-93701.appspot.com/o/nDSBFRU9H180cpXyAbtE%2F6b1ab37c-1a12-4269-aad2-6b27d2c13cd4?alt=media&token=ce883c7d-82fd-4cd0-98d0-aa9aaa354ccf"/>
    </div>
  );
};
export default App;

/* function getChosenNodes (nodes) {
  let result = [];

  nodes.forEach(node => {
    if (node.chosen) {
      result = result.concat([node.nodeid]);
    }


    if (node.children) {
      result = result.concat(getChosenNodes(node.children));
    }
  })

  return result;
} */
