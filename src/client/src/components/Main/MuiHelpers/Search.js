import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import {Icons} from '../../Icons/iconsDashboard'
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import {ThemeContext} from "styled-components";

const useStyles = makeStyles((theme) => ({
  iconClose: {
    transform: `translateX(0)`,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.background.contrast,
    borderStyle: 'solid',
    boxShadow: 'inset 0px 0px 33px -6px rgba(0,0,0,0.10)',
    borderWidth:1,
    backgroundColor: theme.palette.type =='dark' ?theme.palette.background.default :theme.palette.background.drawer,
    transition: theme.transitions.create('background-color', {
      duration: 600,
    }),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    zIndex:0,
    alignItems: 'center',
    justifyContent: 'center',
    color:theme.palette.text.primary,
  },
  closeIcon: {
    pointerEvents: 'auto',
    cursor:'pointer',
    zIndex:10,
  },
  SearchColored: {
    transform: `translateX(0px)`,
    color: theme.palette.text.primary,
    transition: theme.transitions.create('all', {
      easing: 'ease',
      duration: 700,
    }),
  },
  searchIconOpen: {
    transform: `translateX(-5px)`,
  },
  searchShadow: {
    boxShadow:'1px 1px 0px 1px rgba(0,0,0,0.18)',
  },
  inputRoot: {
    color: theme.palette.text.primary,
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color: theme.palette.text.primary,
  },
}));

export function Search({options=[],onSearch,searchLabel="Pesquisar…",shadow=false,inputProps,...props}) {

  const theme = React.useContext(ThemeContext)

  const [search, setSearch] = useState('')

  const classes = useStyles();


  function onFocusSearch() {
  }

  function onBlurSearch() {
    if (search.trim() === '') {
    }
  }

  function onCleanSearch() {
    setSearch('')
    onSearch('')
  }

  // React.useEffect(() => {
  //   if (search && search.length>=1) {
  //     const filteredList = onFilterNestedObjects(lists)
  //     setFilteredArray(filteredList)
  //   } else {
  //     setAllOpen([])
  //     setFilteredArray(lists)
  //   }
  // }, [search,lists])

  function onInputSearch(e) {
    setSearch(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className={clsx(classes.search,{
      [classes.searchShadow]:shadow,
    })} {...props}>
      <div className={clsx(classes.searchIcon,{
        [classes.closeIcon]: search && search.length>=1,
      })}>
        <Icons style={search && search.length>=1?{fontSize:20,marginLeft:-2}:{fontSize:18}}
          type={search && search.length>=1?'HighlightOff':'Search'}
          onClick={onCleanSearch}
          className={clsx(classes.SearchColored, {
          [classes.searchIconOpen]: true,
        })}/>
      </div>
      <InputBase
        onFocus={onFocusSearch}
        onBlur={onBlurSearch}
        value={search}
        onChange={(e)=> onInputSearch(e)}
        placeholder={searchLabel}
        classes={{
          root: classes.inputRoot,
        }}
        className={classes.inputInput}
        inputProps={{ 'aria-label': 'search' }}
        {...inputProps}
      />
    </div>
  );
}

