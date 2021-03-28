import React, {useState,useEffect} from 'react'
import Table from '../../../components/Main/Table'
import {FilterComponent,LoadingContent} from '../../../components/Main/Table/comp'
import Container from './comp'
import Modal from './Modal'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import {useLoaderScreen} from '../../../context/LoaderContext'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useParams } from 'react-router-dom';

function Companies() {

  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  const [dataRows, setDataRows] = useState([])
  const [selected, setSelected] = React.useState([]);

  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()

  let { cnpj,tabId } = useParams();

  const tabsLabel = ['Principal', 'Organograma','Empregados', 'Informações Adicionais']

    console.log('tabId',tabId);
    return (
        <>
            <Header icons={'Business'} path={'Gerenciar suas Empresas / Editar'} title={'Editar Empresa'} video={true}/>
            <Container style={{width:'100%',backgroundColor:'#1a1a1e',borderRadius:'15px'}}>
              <Container.TableTabs
                data={data}
                tabsLabel={tabsLabel}
                notification={notification}
                currentUser={currentUser}
                cnpj={cnpj}
                setData={setData}
                tabId={tabId}
              />
            </Container>
        </>
    )
}

export default Companies
