import React, {useState, useEffect,useMemo} from 'react';
import AddModal from './comp'
import {estados} from '../../../../constants/geral'
import Carrousel from '../../../../components/Main/Carrousel/CarrouselFirst'
import {onCheckCNPJExists,onGetCNPJ,onCreateNewCompany} from './func'

const companiesTypes = [
    {type:'Grupo Empresarial',text:'Em desemvolvimento'},
    {type:'Matriz',text:'A matriz é o estabelecimento principal, a sede, aquela que dirige as demais empresas que são as filiais, sucursais ou agências.'},
    {type:'Filial',text:'Em desemvolvimento'}
]

const initialStateReceita = {
    estados,
    nome: "",
    fantasia: "",
    tipo: "",
    atividade_principal:[{text:'',code:''}],
    atividades_secundarias:[{text:'',code:''}],
    cep: "",
    municipio: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
    telefone: "",
    email: "",
    ultima_atualizacao: "",
    uf:"",
    celular: "",
}

const initialStateData = {
    CNPJ:'',
    status:'',
    message:'',
    type:'',
    responsavel:'',
    fiscal:'',
    fiscalCell:'',
    identificacao:'',
    supervisor:''
}

export default function Modal({open,setOpen,notification,currentUser,setLoad,setDataRows}) {


    const [data, setData] = useState(initialStateData) //dados dos email inseridos nos inputs
    const [receitaFederal, setReceitaFederal] = useState(initialStateReceita) //dados dos email inseridos nos inputs
    const [infoModal, setInfoModal] = useState({title:'',text:''}) //para mandar pro modalFullScreen e dizer se ao fechar da um alerta
    const [position, setPosition] = useState(1) //posicao do carrousel

    function onClose(allGood) {
        setOpen(false)
        setData(initialStateData)
        setInfoModal({title:'',text:''})
        setPosition(1)
        setReceitaFederal(initialStateReceita)
        if (allGood) setTimeout(() => {notification.success({message:allGood})}, 1000);
    }

    function onGoBack() {
        setInfoModal({title:'',text:''})
        setPosition(position=>position-1)
    }

    function onNewCompany() {
        setLoad(true)
        onCreateNewCompany({data,setDataRows,receitaFederal,currentUser,notification,setLoad,onClose})
    }
    //console.log(('07.689.002/0001-89'))
    //console.log(('07689002000189'))


    return (
            <AddModal open={open} onClose={onClose} infoModal={infoModal} arrow={position >= 2 ? true : false} onGoBack={onGoBack}>
                <Carrousel sections={4} position={position}>
                    <div style={{margin:'auto',overflow:'visible'}}>
                        <div style={{ maxWidth:1000,transform:'translateY(-50px)', alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 40px'}}>
                            <AddModal.Header first/>
                            <AddModal.Type position={position} setPosition={setPosition} data={data} setData={setData} companiesTypes={companiesTypes} setInfoModal={setInfoModal}/>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:600,margin:'auto'}}>
                        <div style={{alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 20px'}}>
                            <AddModal.Header second/>
                            <AddModal.Input setData={setData} data={data} notification={notification} onCheckCNPJExists={onCheckCNPJExists} companyId={currentUser.company.id}/>
                            <AddModal.Continue setLoad={setLoad} setReceitaFederal={setReceitaFederal} onGetCNPJ={onGetCNPJ} data={data} setData={setData} disable={!(data?.status && data.status ==='Check')} notification={notification} setPosition={setPosition}/>
                        </div>
                    </div>
                    <div style={{margin:'auto',zIndex:1,height:'100vh',width:'100vw',overflowY:'scroll',overflowX:'visible', alignItems:'center',justifyContent:'center'}}>
                        <div style={{ maxWidth:1050/* ,backgroundColor:'red' */, alignItems:'start',display:'flex',flexDirection:'column',margin:'auto',padding:'80px 40px'}}>
                            <AddModal.Form setData={setData} setPosition={setPosition} setReceitaFederal={setReceitaFederal} receitaFederal={receitaFederal} data={data}/>
                        </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:700,margin:'auto'}}>
                        <div style={{alignItems:'center',display:'flex',flexDirection:'column',margin:'0px 20px'}}>
                            <AddModal.Header />
                            <AddModal.LastInput setData={setData} data={data} notification={notification} onCheckCNPJExists={onCheckCNPJExists} companyId={currentUser.company.id}/>
                            <AddModal.Continue done setLoad={setLoad} data={data} setData={setData} notification={notification} onNewCompany={onNewCompany}/>
                        </div>
                    </div>
                </Carrousel>
            </AddModal>
    );
}
