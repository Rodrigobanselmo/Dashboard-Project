import React, {useEffect} from 'react'
import Container from '../components/Dashboard/Container';
import {useAuth} from '../context/AuthContext'
import { useHistory } from "react-router-dom"
import {DASHBOARD} from '../routes/routesNames'

function NoCompany() {

    const {currentUser} = useAuth();
    const history = useHistory()

/*     useEffect(() => {
        if (currentUser?.status && currentUser.status === 'Ativo') history.replace(DASHBOARD)
    }, [currentUser]) */

    return (
      <Container>
        <div className={'center'}>
           <h1 style={{fontSize:22}}>
            Para utilizar a plataforma SimpleSST é necesario estar consiliado a uma empresa. Entre em contato para mais informações
           </h1> 
        </div>
      </Container>
    )
}

export default NoCompany
