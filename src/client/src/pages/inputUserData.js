import React, {useEffect} from 'react'
import Container from '../components/Dashboard/Container';
import {useAuth} from '../context/AuthContext'
import { useHistory } from "react-router-dom"
import {DASHBOARD} from '../routes/routesNames'
import InputUserData from '../components/Dashboard/InputUserData'
function NoCompany() {

    const {currentUser} = useAuth();
    const history = useHistory()

/*     useEffect(() => {
      if (currentUser?.name && currentUser.name !== '') history.replace(DASHBOARD)
    }, [currentUser]) */

    return (
        <InputUserData/>
    )
}

export default NoCompany
