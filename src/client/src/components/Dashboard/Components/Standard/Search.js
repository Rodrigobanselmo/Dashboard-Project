import React from 'react'
import clsx from 'clsx';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
search: {
    position: 'relative',
    borderRadius: 10,
    borderColor: theme.palette.background.line,
    borderStyle: 'solid',
    borderWidth:1.5,
    transform:'scale(1)'

},
searchIcon: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    zIndex:0,
    alignItems: 'center',
    justifyContent: 'center',
},
closeIcon: {
    pointerEvents: 'auto',
    cursor:'pointer',
    zIndex:10,
},
SearchColored: {
    transform: `translateX(0px)`,
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('all', {
    easing: 'ease',
    duration: 700,
    }),
},
inputRoot: {
    color: 'inherit',
},
inputInput: {
    padding: theme.spacing( 0.8, 4.3, 0.8, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3.8)}px)`,
    transition: theme.transitions.create('width'),
    fontSize:17,
    width: '100%',
},
}));

function Search({icons:Icons,onInputSearch,search,onCleanSearch,inputProps,...props}) {
    const classes = useStyles();
    return (
        <div className={classes.search} {...props}>
            <div className={clsx(classes.searchIcon,{
            [classes.closeIcon]: search && search.length>=1,
            })}>
            <Icons style={search && search.length>=1?{fontSize:20}:{fontSize:22}}
                type={search && search.length>=1?'HighlightOff':'Search'}
                onClick={onCleanSearch}
                className={clsx(classes.SearchColored
            )}/>
            </div>
            <InputBase
            value={search}
            onChange={(e)=> onInputSearch(e)}
            placeholder="Pesquisar…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            {...inputProps}
            />
        </div>
    )
}

export default Search
