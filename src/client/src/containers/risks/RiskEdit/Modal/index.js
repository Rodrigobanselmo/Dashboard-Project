import React, {useState, useEffect,useMemo} from 'react';
import {AddModal} from './comp'
import {SubText,DescText,TextArea,} from './styles'
import { useSelector,useDispatch } from 'react-redux'
import {EspecialSelector} from '../../../../components/Main/MuiHelpers/EspecialSelector'
import {filterObject} from '../../../../helpers/ObjectArray'
import {ContinueButton} from '../../../../components/Main/MuiHelpers/Button'
import {useNotification} from '../../../../context/NotificationContext'
import {useAuth} from '../../../../context/AuthContext'

export default function Modal({open,setOpen,type}) {

    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [search, setSearch] = useState('')
    const [selectedFis, setSelectedFis] = useState([])
    const [selectedQui, setSelectedQui] = useState([])
    const [selectedBio, setSelectedBio] = useState([])
    const [selectedAci, setSelectedAci] = useState([])
    const [selectedErg, setSelectedErg] = useState([])
    const {currentUser} = useAuth()
    const notification = useNotification()
    const riskData = useSelector(state => state.riskData)
    const risk = useSelector(state => state.risk)
    const dispatch = useDispatch()

    function onClose() {
        setOpen(false)
    }

    function onData2(id) {
      if (type == 'med' && riskData.med) {
        const index = riskData.med.findIndex(i=>i.id==id)
        if (riskData.med[index]) setData2( riskData.med[index].text)
        return
      }
      if (riskData.rec) {
        const index = riskData.rec.findIndex(i=>i.id==id)
        if (riskData.rec[index]) setData2( riskData.rec[index].text)
        return
      }
    }

    const infoModal = {
      title:'Você tem certeza?',text:'Ao sair as informações inseridas serão perdidas.'
    }


    var override = {
      title1:'Recomendação',
      text1:'Descrição da recomendação',
      title2:'Medidade de Controle',
      text2:'Descrição da medida de controle',
    }

    if (type == 'med') {
      override = {
        title1:'Medidade de Controle',
        text1:'Descrição da medida de controle',
        title2:'Recomendação',
        text2:'Descrição da recomendação',
      }
    }

    if (type == 'font') {
      override = {
        title1:'Fonte Geradora',
        text1:'Descrição da fonte geradora',
      }
    }

    return (
            <AddModal open={open} onClose={onClose} infoModal={infoModal}>
              <div style={{display:'flex',minWidth:'100vw',flexDirection:'row',flexGrow:1,padding:'5% 8% 10% 8%'}}>
                <div style={{display:'flex',width:'100%',justifyContent:'space-between',flexDirection:'column',flexGrow:100}}>
                  <div  style={{display:'flex',flex:1,position:'relative',flexDirection:'column'}}>
                    <DescText>Descrição</DescText>
                    <SubText>{override.title1}</SubText>
                    <TextArea
                      type={type}
                      placeholder={override.text1}
                      maxLength={300}
                      value={data1}
                      onChange={({target})=>setData1(target.value)}
                    />
                    <p style={{position:'absolute',bottom:type !== 'font'?22:'auto',top:type == 'font'?267:'auto',right:'9%',opacity:0.5,fontSize:13}}>characteres restantes: {300-data1.length}</p>
                  </div>
                  {type !== 'font' &&
                    <div style={{display:'flex',flex:1,position:'relative',flexDirection:'column'}}>
                      <SubText>{override.title2}</SubText>
                      <TextArea
                        style={{marginBottom:10}}
                        placeholder={override.text2}
                        maxLength={300}
                        value={data2}
                        onChange={({target})=>setData2(target.value)}
                      />
                      <SubText>Adicionar {override.title2.toLocaleLowerCase()} já existente</SubText>
                      <EspecialSelector
                        bottom
                        isSimpleSelection
                        hideSelectAll
                        width={'93%'}
                        onSelectFunction={onData2}
                        onSearch={setSearch}
                        options={type == 'med' ? (riskData.med ? riskData.med.filter(i=> (search == '' || filterObject(i,search,'name') )):[]):(riskData.rec ? riskData.rec.filter(i=> (search == '' || filterObject(i,search,'name') )):[])}
                      />
                      <p style={{position:'absolute',bottom:77,right:'9%',opacity:0.5,fontSize:13}}>characteres restantes: {300-data2.length}</p>
                    </div>
                  }
                </div>
                <div style={{position:'relative',display:'flex',flexDirection:'column',width:'100%',flexGrow:100,alignItems:'flex-end',justifyContent:'space-between'}}>
                  <div style={{width:'93%'}}>
                    <DescText>Fatores de Risco Associados</DescText>
                    <SubText>Relacionar a Fatores de Risco <strong>Físicos</strong></SubText>
                      <EspecialSelector
                        defaultValue={[]}
                        width={'100%'}
                        onSelectFunction={setSelectedFis}
                        onSearch={setSearch}
                        options={risk.filter(i=>i.type == 'fis' && (search == '' || filterObject(i,search,'name')))}
                      />
                  </div>
                  <div style={{width:'93%'}}>
                    <SubText>Relacionar a Fatores de Risco <strong>Químicos</strong></SubText>
                    <EspecialSelector
                      width={'100%'}
                      isToMany
                      onSelectFunction={setSelectedQui}
                      onSearch={setSearch}
                      options={risk.filter(i=>i.type == 'qui' && (search == '' || filterObject(i,search,'name')))}
                    />
                  </div>
                  <div style={{width:'93%'}}>
                    <SubText>Relacionar a Fatores de Risco <strong>Biológicos</strong></SubText>
                    <EspecialSelector
                      width={'100%'}
                      onSelectFunction={setSelectedBio}
                      onSearch={setSearch}
                      options={risk.filter(i=>i.type == 'bio' && (search == '' || filterObject(i,search,'name')))}
                    />
                  </div>
                  <div style={{width:'93%'}}>
                    <SubText>Relacionar a Fatores de Risco <strong>Acidentes</strong></SubText>
                    <EspecialSelector
                      bottom
                      width={'100%'}
                      onSelectFunction={setSelectedAci}
                      onSearch={setSearch}
                      options={risk.filter(i=>i.type == 'aci' && (search == '' || filterObject(i,search,'name')))}
                    />
                  </div>
                  <div style={{width:'93%'}}>
                    <SubText>Relacionar a Fatores de Risco <strong>Ergonômicos</strong></SubText>
                    <EspecialSelector
                      bottom
                      width={'100%'}
                      onSelectFunction={setSelectedErg}
                      onSearch={setSearch}
                      options={risk.filter(i=>i.type == 'erg' && (search == '' || filterObject(i,search,'name')))}
                    />
                  </div>
                  <ContinueButton style={{position:'absolute',right:0,bottom:-80}} primary={'true'} size={'medium'} disable={`${false}`}>
                    <p>Continuar</p>
                  </ContinueButton>
                </div>
              </div>
            </AddModal>
    );
}
