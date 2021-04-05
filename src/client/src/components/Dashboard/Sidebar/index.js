import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import {useStyles} from './styles'
import {Icons} from '../../Icons/iconsDashboard'
import {lists} from '../../../constants/itemsDrawer'
import { useSelector,useDispatch } from 'react-redux'
import InputBase from '@material-ui/core/InputBase';
import useWaitAction from '../../../hooks/useWaitAction'
import { useHistory } from "react-router-dom"
import {ThemeContext} from "styled-components";

function DrawerMenu({open,setOpen,lock,onClearTimeOut,onTimeOut,setLock}) {

  const activeRoute = useSelector(state => state.route)
  const dispatch = useDispatch()
  const [noHandle,value,onActionTimeOut] = useWaitAction();
  const theme = React.useContext(ThemeContext)

  const [allOpen, setAllOpen] = useState([])
  const [search, setSearch] = useState('')
  const [filteredArray, setFilteredArray] = useState(lists)

  const [collapse, setCollapse] = useState(true)
  const [nav, setNav] = useState(null)
  const [subNav, setSubNav] = useState(null)

  const history = useHistory()
  const classes = useStyles();

  useEffect(() => {
    const location = window.location.pathname.slice(-1)==='/' ? window.location.pathname.slice(1,window.location.pathname.length-1):  window.location.pathname.slice(1,window.location.pathname.length)
    const [dashboard, ...route] = location.split('/')
    console.log(route)
    dispatch({ type: 'ROUTE', payload:window.location.pathname.slice(-1)==='/' ? window.location.pathname.slice(0,window.location.pathname.length-1): window.location.pathname })

    return history.listen((location) => {
      dispatch({ type: 'ROUTE', payload:location.pathname.slice(-1)==='/' ? location.pathname.slice(0,location.pathname.length-1): location.pathname })
      //setNav(null)
      //setSubNav(null)
    })
 },[history])

  function onClickList(item) {
    if (search && search.length>=1) {
      if (item.items) {
        if ( allOpen.find(i=>i===item.id) ) setAllOpen(allOpen=>allOpen.filter(i => i !== item.id));
        else setAllOpen(allOpen=>[...allOpen,item.id])
      }
      else {
        history.push(item.random ? `${item.to}${Math.floor(Math.random()*1000)}` : item.to)
        dispatch({ type: 'SET_ROUTE', payload:{subList:1,subSubList:1,list:item.id} })
      }
    } else {
      if (noHandle) {
        if (item.id === nav) {
          setCollapse('same')
          } else {
          setCollapse(false)
        }
        onActionTimeOut(item.id,null,()=>{
          setNav(nav===item.id ? null:item.id)
          if (item.id === nav) setCollapse('true')
          else setCollapse(true)
        },300)
        if (item.items) {
        }
        else {
          history.push(item.random ? `${item.to}${Math.floor(Math.random()*1000)}` : item.to)
          dispatch({ type: 'SET_ROUTE', payload:{subList:1,subSubList:1,list:item.id} })
        }
      }
    }
  }

  function onClickSubList(item,subItem) {
    if (search && search.length>=1) {
      if (subItem.items) {
        if ( allOpen.find(i=>i===subItem.id) ) setAllOpen(allOpen=>allOpen.filter(i => i !== subItem.id));
        else setAllOpen(allOpen=>[...allOpen,subItem.id])
      }
      else {
        history.push(subItem.random ? `${subItem.to}${Math.floor(Math.random()*1000)}` : subItem.to)
        dispatch({ type: 'SET_ROUTE', payload:{list:item.id,subList:subItem.id,subSubList:1} })
        setSubNav(null)
      }
    } else {
      setSubNav(subNav===subItem.id ? null:subItem.id)
      if (subItem.items) {}
      else {
        history.push(subItem.random ? `${subItem.to}${Math.floor(Math.random()*1000)}` : subItem.to)
        dispatch({ type: 'SET_ROUTE', payload:{list:item.id,subList:subItem.id,subSubList:1} })
        setSubNav(null)
      }
    }
  }

  function onClickSubSubList(item,subItem,subSubItem) {
    history.push(subSubItem.random ? `${subSubItem.to}${Math.floor(Math.random()*1000)}` : subSubItem.to)
    dispatch({ type: 'SET_ROUTE', payload:{list:item.id,subList:subItem.id,subSubList:subSubItem.id} })
  }

  function onMouseEnterDrawer() {
    onClearTimeOut()
    if (!open && !lock) {
      onTimeOut(()=>{
        setOpen(true)
      },300)
    }
  }

  function onMouseLeaveDrawer() {
    onClearTimeOut()
    if (!lock) {
      onTimeOut(()=>{
        setOpen(false)
      },500)
    }
  }

  function onFocusSearch() {
    if (lock === true) setLock(true)
    else setLock('true')
    setOpen(true)
  }

  function onBlurSearch() {
    if (lock==='true' && search.trim() === '') {
      setLock(false)
      setOpen(false)
    }
  }

  function onCleanSearch() {
    setSearch('')
    if (lock==='true') {
      setLock(false)
    }
  }

  function onFilterNestedObjects(firstArrayOfObject) {

    function filterObject(objectToFilter) {
      return objectToFilter.text.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes( search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") )
    }

    const firstArrayFiltered = []
    firstArrayOfObject.map((firstObject)=>{
      const firstObjectFiltered = {...firstObject}
      if (!firstObject.items) {if(filterObject(firstObject)) firstArrayFiltered.push({...firstObject})}
      else {
        const secondArrayFiltered = []
        firstObject.items.map((secondObject)=>{
          const secondObjectFiltered = {...secondObject}
          if (!secondObject.items) {if(filterObject(secondObject)) secondArrayFiltered.push({...secondObject});}
          else {
            const thirdArrayFiltered = []
            secondObject.items.map((thirdObject)=>{
              const thirdObjectFiltered = {...thirdObject}
              if (!thirdObject.items) {if(filterObject(thirdObject)) thirdArrayFiltered.push({...thirdObject})}
              else {
                const fourthArrayFiltered = []
                thirdObject.items.map((fourthObject)=>{
                  if (!fourthObject.items) {if(filterObject(fourthObject)) fourthArrayFiltered.push({...fourthObject})}
                })
                if (fourthArrayFiltered.length > 0) {
                  thirdObjectFiltered.items = fourthArrayFiltered
                  thirdArrayFiltered.push({...thirdObjectFiltered})
                  setAllOpen(allOpen=>[...allOpen,thirdObjectFiltered.id]);
                } else if(filterObject(thirdObject)) thirdArrayFiltered.push({...thirdObject})
              }
            })
            if (thirdArrayFiltered.length > 0) {
              secondObjectFiltered.items = thirdArrayFiltered
              secondArrayFiltered.push({...secondObjectFiltered})
              setAllOpen(allOpen=>[...allOpen,secondObjectFiltered.id]);
            } else if(filterObject(secondObject)) secondArrayFiltered.push({...secondObject})
          }
        })
        if (secondArrayFiltered.length > 0) {
          firstObjectFiltered.items = secondArrayFiltered
          firstArrayFiltered.push({...firstObjectFiltered})
          setAllOpen(allOpen=>[...allOpen,firstObjectFiltered.id]);
        } else if(filterObject(firstObject)) firstArrayFiltered.push({...firstObject})
        else  firstArrayFiltered.push({...firstObject,items:[]})
      }
    })

    return firstArrayFiltered

  }

  React.useEffect(() => {
    if (search && search.length>=1) {
      const filteredList = onFilterNestedObjects(lists)
      setFilteredArray(filteredList)
    } else {
      setAllOpen([])
      setFilteredArray(lists)
    }
  }, [search,lists])

  function onInputSearch(e) {
    setSearch(e.target.value)
    if (nav) setNav(null)
    if (subNav) setSubNav(null)
  }

  return (
    <Drawer
      onMouseEnter={onMouseEnterDrawer}
      onMouseLeave={onMouseLeaveDrawer}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawer,{
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >

      <div style={{overflowY:'scroll',overflowX:'hidden',paddingBottom:10}}>

        <div className={classes.search}>
          <div className={clsx(classes.searchIcon,{
            [classes.closeIcon]: search && search.length>=1,
          })}>
            <Icons style={search && search.length>=1?{fontSize:20,marginLeft:-2}:{fontSize:18}}
              type={search && search.length>=1?'HighlightOff':'Search'}
              onClick={onCleanSearch}
              className={clsx(classes.SearchColored, {
              [classes.searchIconOpen]: !open,
            })}/>
          </div>
          <InputBase
            onFocus={onFocusSearch}
            onBlur={onBlurSearch}
            value={search}
            onChange={(e)=> onInputSearch(e)}
            placeholder="Pesquisar…"
            classes={{
              root: classes.inputRoot,
            }}
            className={classes.inputInput}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {filteredArray.map((list) => (
          <div key={list.id}>
            <p className={clsx(classes.listTitle, {
              [classes.listTitleOpen]: open,
            })}>{list.category}</p>
            <List  disablePadding={true}>
              {list?.items && list.items.map((item) => (
                <div key={item.id} className={clsx({
                  [classes.subListOpenContainer]: item?.items && item.items.length > 0 && (value===item.id || nav===item.id || allOpen.find((i)=>i==item.id)),
                  [classes.subListOpenContainerActive]: activeRoute.list===item.id && nav!==item.id,
                })}>
                  <div onClick={()=>onClickList(item)}
                    className={clsx(classes.list, {
                      [classes.listOpen]: value===item.id || nav===item.id || allOpen.find((i)=>i==item.id),
                      [classes.listActive]: activeRoute.list===item.id,
                    })} >
                      <div  className={clsx(classes.icon, {
                        [classes.iconColored]: value===item.id || nav===item.id || allOpen.find((i)=>i==item.id),
                        [classes.iconClose]: !open,
                        [classes.iconActive]: activeRoute.list===item.id,
                        })}
                        style={item?.style && item.style}>
                        <Icons
                          type={item.icon}
                         />
                      </div>
                      <p
                        className={clsx(classes.listText, {
                          [classes.listTextOpen]: value===item.id || nav===item.id || allOpen.find((i)=>i==item.id),
                          [classes.listTextOpenActive]: activeRoute.list===item.id,
                          [classes.listTextClose]: !open,
                      })}>
                        {item.text}
                      </p>
                      {item?.items && <Icons
                        type={'KeyboardArrowRightIcon'}
                        className={clsx(classes.arrow, {
                          [classes.arrowOpen]: value===item.id || nav===item.id || allOpen.find((i)=>i==item.id),
                          [classes.arrowActive]:  activeRoute.list===item.id,
                      })}/>}
                      <div
                        className={clsx(classes.bar, {
                          [classes.barActive]: activeRoute.list===item.id,
                        })}/>
                  </div>
                  <div >
                  <Collapse in={((value===item.id && collapse!=='same' && collapse!=='true' ) || (nav===item.id && collapse && collapse!=='same'))|| Boolean(allOpen.find((i)=>i==item.id)) }>
                    {((value===item.id || nav===item.id || (search && search.length>=1)) && item?.items) && item.items.map((subItem) => (
                      <div key={subItem.id} className={clsx({
                        [classes.subListOpenContainer]: subItem?.items && subItem.items.length > 0 && (value===subItem.id || subNav===subItem.id || allOpen.find((i)=>i==subItem.id)),
                        [classes.subListOpenContainerActive]: activeRoute.subList===subItem.id && subNav!==subItem.id,
                      })}>
                        <div onClick={()=>onClickSubList(item,subItem)}
                        className={clsx(classes.list,classes.subList, {
                          [classes.subListOpen]: subNav===subItem.id,
                          [classes.subListOpenMore]: (subNav===subItem.id && subItem?.items),
                        })}>
                          <div  className={clsx(classes.circle, {
                            [classes.circleOpen]: open,
                            [classes.circleBig]: (subNav===subItem.id || activeRoute.subList===subItem.id|| allOpen.find((i)=>i==subItem.id)),
                            [classes.circleOpenBig]: (subNav===subItem.id || activeRoute.subList===subItem.id|| allOpen.find((i)=>i==subItem.id)) && open,
                            [classes.circleActive]: activeRoute.subList===subItem.id,
                          })}/>
                          <p
                            className={clsx(classes.listText,classes.subListText, {
                              [classes.subListTextOpen]: subNav===subItem.id,
                              [classes.subListTextOpenActive]: activeRoute.subList===subItem.id,
                              [classes.listTextClose]: !open,
                            })}
                            >
                            {subItem.text}
                          </p>
                          {subItem?.items && <Icons
                            type={'Add'}
                            className={clsx(classes.arrow, {
                              [classes.addOpen]: subNav===subItem.id,
                              [classes.arrowActive]: activeRoute.subList===item.id,
                          })}/>}
                        </div>

                        <Collapse in={subNav===subItem.id || Boolean(allOpen.find((i)=>i==subItem.id))}>
                          {subItem?.items && subItem.items.map((subSubItem) => (
                            <div onClick={()=>onClickSubSubList(item,subItem,subSubItem)} key={subSubItem.id}
                            className={clsx(classes.list,classes.subSubList, {
                              [classes.subSubListOpen]: activeRoute.subSubList===subSubItem.id,
                            })}>
                              <div  className={clsx(classes.circle,classes.subCircle, {
                                [classes.circleBig]: activeRoute.subSubList===subSubItem.id,
                                [classes.subCircleOpen]: activeRoute.subSubList===subSubItem.id,
                                [classes.subCircleOpenBig]: activeRoute.subSubList===subSubItem.id && !open,
                                [classes.subCircleClose]: !open,
                              })}/>
                              <p
                                className={clsx(classes.listText,classes.subSubListText, {
                                  [classes.subSubListTextActive]: activeRoute.subSubList===subSubItem.id,
                                  [classes.listTextClose]: !open,
                                })}
                                >
                                {subSubItem.text}
                              </p>
                            </div>
                          ))}
                        </Collapse>
                      </div>
                    ))}
                  </Collapse>
                  </div>
                </div>
              ))}
            </List>
          </div>
        ))}
      </div>
    </Drawer>
  );
}

export default React.memo(DrawerMenu)
