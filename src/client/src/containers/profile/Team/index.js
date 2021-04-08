import React, {useState,useEffect} from 'react'
import TableMembers from './Table'
import Modal from './Modal'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useLocation } from 'react-router-dom';
import {useLoaderDashboard} from '../../../context/LoadDashContext'

function Team() {

  const [open, setOpen] = useState(false)
  const [queryOld, setQueryOld] = useState(false)
  const [usersRows, setUsersRows] = useState([])

  const {currentUser} = useAuth()
  const notification = useNotification()
  const query = new URLSearchParams(useLocation().search)
  const { setLoaderDash } = useLoaderDashboard();

  useEffect(() => {
    if (query.get('m') !== queryOld && query.get('m')) setOpen(true); setQueryOld(query.get('m'))
  }, [query])

    return (
        <>
            <Header icons={'Admin'} title={'Gerenciamento de Usuários'} video={true}/>
            <div style={{width:'100%',backgroundColor:'#1a1a1e',borderRadius:'15px'}}>
                <TableMembers setLoaderDash={setLoaderDash} currentUser={currentUser} notification={notification} setUsersRows={setUsersRows} usersRows={usersRows} setOpen={setOpen}/>
            </div>
            <Modal setUsersRows={setUsersRows} open={open} setOpen={setOpen}/>
        </>
    )
}

export default Team
