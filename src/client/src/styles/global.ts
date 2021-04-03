import { createGlobalStyle } from 'styled-components';
import { darken } from '@material-ui/core/styles';

export const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    outline:none;
    margin: 0;
    padding: 0;
  }
  html, body {
    height: 100%;
    font-family: 'Encode Sans Expanded','Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #000000;
    color: #333333;
    font-size: 16px;

  * ::-webkit-scrollbar {
      width: 5px;
      height:8px;
  }
  * ::-webkit-scrollbar-thumb:hover {
      background: #333333;
    }
  * ::-webkit-scrollbar-thumb {
    background: #26262A;
    border-radius: 10px;
  }
  * ::-webkit-scrollbar-track {
      background: #1a1a1e;
      //background: ${darken('#26262A', 0.4)};
  }

  .noBreakText {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .rowCenter {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }


}`;
