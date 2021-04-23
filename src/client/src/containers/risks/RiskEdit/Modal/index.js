import React, {useState, useEffect,useMemo} from 'react';
import {AddModal} from './comp'
import {onCreateNewRiskData} from './func'
import {SubText,DescText,TextArea,} from './styles'
import { useSelector,useDispatch } from 'react-redux'
import {EspecialSelector} from '../../../../components/Main/MuiHelpers/EspecialSelector'
import {filterObject} from '../../../../helpers/ObjectArray'
import {ContinueButton} from '../../../../components/Main/MuiHelpers/Button'
import {useNotification} from '../../../../context/NotificationContext'
import {useLoaderScreen} from '../../../../context/LoaderContext'
import {useAuth} from '../../../../context/AuthContext'

export default function Modal({open,setOpen,type, data}) {

    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [search, setSearch] = useState('')
    const [selectedFis, setSelectedFis] = useState([])
    const [selectedQui, setSelectedQui] = useState([])
    const [selectedBio, setSelectedBio] = useState([])
    const [selectedAci, setSelectedAci] = useState([])
    const [selectedErg, setSelectedErg] = useState([])
    const {currentUser} = useAuth()
    const {setLoad} = useLoaderScreen();
    const notification = useNotification()
    const riskData = useSelector(state => state.riskData)
    const risk = useSelector(state => state.risk)
    const dispatch = useDispatch()

    function onClose(allGood) {
      setOpen(false)
      setData1('')
      setData2('')
      setSelectedFis([])
      setSelectedQui([])
      setSelectedBio([])
      setSelectedAci([])
      setSelectedErg([])
      if (allGood) setTimeout(() => {notification.success({message:allGood})}, 1000);
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

    function createData() {
      const uid = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
      const uid2 = Math.floor((1 + Math.random()) * 0x1000000000000000).toString(32).substring(1);
      const category = []
      const riskIds = []

      if (selectedFis.length == 1 && selectedFis[0] == 'all') category.push('fis')
      else if (selectedFis.length > 0 && selectedFis[0] !== 'all') riskIds.push(...selectedFis)

      if (selectedQui.length == 1 && selectedQui[0] == 'all') category.push('qui')
      else if (selectedQui.length > 0 && selectedQui[0] !== 'all') riskIds.push(...selectedQui)

      if (selectedBio.length == 1 && selectedBio[0] == 'all') category.push('bio')
      else if (selectedBio.length > 0 && selectedBio[0] !== 'all') riskIds.push(...selectedBio)

      if (selectedAci.length == 1 && selectedAci[0] == 'all') category.push('aci')
      else if (selectedAci.length > 0 && selectedAci[0] !== 'all') riskIds.push(...selectedAci)

      if (selectedErg.length == 1 && selectedErg[0] == 'all') category.push('erg')
      else if (selectedErg.length > 0 && selectedErg[0] !== 'all') riskIds.push(...selectedErg)

      //console.log(category)
      //console.log(riskIds)
      if (data1.length > 0 && (category.length || riskIds.length)) {
        if (type == 'rec') {
          let dataRec = {id:uid,type:'rec',text:data1,risk:[...riskIds],category:[...category]}
          if (data2.length > 0) {
            let dataMed = {id:uid2,rec:uid,type:'med',text:data2,risk:[...riskIds],category:[...category]}
            dataRec.med = uid2
            onCreateNewRiskData({data:[{...dataRec},{...dataMed}],companyId:currentUser.company.id,notification,dispatch,setLoad,onClose})
          } else onCreateNewRiskData({data:[{...dataRec}],companyId:currentUser.company.id,notification,dispatch,setLoad,onClose})
        }
        if (type == 'med') {
          let dataMed = {id:uid,type:'rec',text:data1,risk:[...riskIds],category:[...category]}
          if (data2.length > 0) {
            let dataRec = {id:uid2,med:uid,type:'med',text:data2,risk:[...riskIds],category:[...category]}
            dataMed.rec = uid2
            onCreateNewRiskData({data:[{...dataRec},{...dataMed}],companyId:currentUser.company.id,notification,dispatch,setLoad,onClose})
          } else onCreateNewRiskData({data:[{...dataMed}],companyId:currentUser.company.id,notification,dispatch,setLoad,onClose})
        }
        if (type == 'font') {
          let dataFont = {id:uid,type:'font',text:data1,risk:[...riskIds],category:[...category]}
          onCreateNewRiskData({data:[{...dataFont}],companyId:currentUser.company.id,notification,dispatch,setLoad,onClose})
        }
      } else if (data1.length == 0) return notification.error({message:`Campo ˜${override.title1}˜ não pode ser nulo.`,modal:true})
      else return notification.error({message:`É Necessário selecionar ao menos um risco para continuar.`,modal:true})
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
                        defaultValue={data.type=='fis'?[data.id]:[]}
                        width={'100%'}
                        onSelectFunction={setSelectedFis}
                        onSearch={setSearch}
                        options={risk.filter(i=>i.type == 'fis' && (search == '' || filterObject(i,search,'name')))}
                      />
                  </div>
                  <div style={{width:'93%'}}>
                    <SubText>Relacionar a Fatores de Risco <strong>Químicos</strong></SubText>
                    <EspecialSelector
                      defaultValue={data.type=='qui'?[data.id]:[]}
                      width={'100%'}
                      isToMany
                      onSelectFunction={setSelectedQui}
                      onSearch={setSearch}
                      options={risk.filter(i=>i.type == 'qui' && (search == '' || filterObject(i,search,'name'))).slice(0,30)}
                    />
                  </div>
                  <div style={{width:'93%'}}>
                    <SubText>Relacionar a Fatores de Risco <strong>Biológicos</strong></SubText>
                    <EspecialSelector
                      defaultValue={data.type=='bio'?[data.id]:[]}
                      width={'100%'}
                      onSelectFunction={setSelectedBio}
                      onSearch={setSearch}
                      options={risk.filter(i=>i.type == 'bio' && (search == '' || filterObject(i,search,'name')))}
                    />
                  </div>
                  <div style={{width:'93%'}}>
                    <SubText>Relacionar a Fatores de Risco <strong>Acidentes</strong></SubText>
                    <EspecialSelector
                      defaultValue={data.type=='aci'?[data.id]:[]}
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
                      defaultValue={data.type=='erg'?[data.id]:[]}
                      bottom
                      width={'100%'}
                      onSelectFunction={setSelectedErg}
                      onSearch={setSearch}
                      options={risk.filter(i=>i.type == 'erg' && (search == '' || filterObject(i,search,'name')))}
                    />
                  </div>
                  <ContinueButton onClick={createData} style={{position:'absolute',right:0,bottom:-80}} primary={'true'} size={'medium'} disable={`${false}`}>
                    <p>Continuar</p>
                  </ContinueButton>
                </div>
              </div>
            </AddModal>
    );
}
