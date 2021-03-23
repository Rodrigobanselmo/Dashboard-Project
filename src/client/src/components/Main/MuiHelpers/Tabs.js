import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{paddingBottom:0}}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    borderRadius:15,
  },
  tabHeader: {
    backgroundColor: 'transparent',
    padding:'0px 0px',
    boxShadow: 'none',
    borderBottom:`1px ${theme.palette.background.line} solid`,
  },
}));

    const TabsStyled = withStyles((theme) => ({
        indicator: {
        backgroundColor: theme.palette.primary.main,
        },
    }))((props) => <Tabs {...props} />);

    const TabStyled = withStyles((theme) => ({
        root: {
          textTransform: 'none',
          minWidth: 200,
          color: theme.palette.text.contrastWhite,
          fontSize:15,
          marginRight: theme.spacing(4),
          '&:hover': {
            color: theme.palette.primary.main,
            opacity: 1,
          },
          '&$selected': {
            color: theme.palette.text.secondaryLighter,
            fontWeight: theme.typography.fontWeightMedium,
          },
          '&:focus': {
            color: theme.palette.text.secondaryLighter,
          },
        },
        selected: {},
    }))((props) => <Tab {...props} />);

function TabItems(params) {

}

export default function SimpleTabs({component:Component, children, tabsLabel=[] , ...props}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.tabHeader}>
        <TabsStyled value={value} onChange={handleChange} aria-label="simple tabs example">
            {tabsLabel.map((item,index)=>(
                <TabStyled key={index} label={item} {...a11yProps(index)}/>
            ))}
        </TabsStyled>
      </AppBar>
        {children}
        {tabsLabel.map((item,index)=>{
          return(
            <TabPanel key={index} value={value} index={index} >
                <Component item={item}/>
            </TabPanel>
        )})}
    </div>
  );
}
