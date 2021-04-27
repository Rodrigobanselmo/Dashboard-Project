import React, {useState,useEffect} from 'react'
import Container,{MainComponent} from './comp'
import Header from '../../components/Dashboard/Components/Blocks/Header'
import {useLoaderScreen} from '../../context/LoaderContext'
import {useLoaderDashboard} from '../../context/LoadDashContext'
import {useNotification} from '../../context/NotificationContext'
import {useAuth} from '../../context/AuthContext'
import { useLocation } from 'react-router-dom';

function ChecklistManager() {

  const {setLoad} = useLoaderScreen();
  const { setLoaderDash } = useLoaderDashboard();
  const {currentUser} = useAuth()
  const notification = useNotification()

  useEffect(() => {
    setLoaderDash(false)
  }, [])

    return (
        <>
            <Header icons={'Checklist'} title={'Gerenciar Checklists'} video={true}/>
            <Container >
            <MainComponent
                notification={notification}
                currentUser={currentUser}
                setLoad={setLoad}
                setLoaderDash={setLoaderDash}
              />
            </Container>
        </>
    )
}

export default ChecklistManager
