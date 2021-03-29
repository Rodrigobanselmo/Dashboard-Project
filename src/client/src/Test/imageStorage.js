import React from 'react';
import JSZip from 'jszip';
import firebase from 'firebase/app';
import { saveAs } from 'file-saver';

const App = () => {

  const downloadFolderAsZip = async (folderPath) => {
    const jszip = new JSZip();
    const folderRef = firebase.storage().ref('nDSBFRU9H180cpXyAbtE');
    const files = (await folderRef.listAll()).items;
    const downloadUrls = await Promise.all(
        files.map(({ name }) => folderRef.child(name).getDownloadURL())
    );
    const downloadedFiles = await Promise.all(downloadUrls.map(url => fetch(url).then(res => res.blob())));
    downloadedFiles.forEach((file, i) => jszip.file(files[i].name, file));
    const content = await jszip.generateAsync({ type: 'blob' });
    saveAs(content, folderPath);
};

  return (
    <div style={{}}>
      <button onClick={()=>downloadFolderAsZip()}>Teste</button>
      <img src="https://firebasestorage.googleapis.com/v0/b/react-dashboard-93701.appspot.com/o/nDSBFRU9H180cpXyAbtE%2F6b1ab37c-1a12-4269-aad2-6b27d2c13cd4?alt=media&token=ce883c7d-82fd-4cd0-98d0-aa9aaa354ccf"/>
    </div>
  );
};
export default App;
