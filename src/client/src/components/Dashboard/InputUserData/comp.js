import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles,withStyles } from '@material-ui/core/styles';
import {Icons} from '../../Icons/iconsDashboard';
import {} from './styles';
import {ModalMui, ModalFullScreen} from '../../Main/MuiHelpers/Modal'
import RichSelect from '../../Dashboard/Components/MultUsage/RichSelect'
import useTimeOut from '../../../hooks/useTimeOut';
import {TotalNumVerification} from '../../../helpers/StringVerification';
import {ContinueButton} from '../../Main/MuiHelpers/Button'
import Input from '../../Main/MuiHelpers/Input'
import IconButton from '../../Main/MuiHelpers/IconButton';
import {HeaderPage,Page,Container,InputsContainer,Title,SubTitle,IconCloseFull,IconGoBackFull} from '../../Dashboard/Components/Standard/PageCarousel'
import Checkbox from '@material-ui/core/Checkbox';
import {FormLabel,PoliticsContainer} from './styles'


export default function PageWrapper({children, ...restProps }) {
    return (
        <Page {...restProps}>
          <Container> 
            {children}
          </Container>
        </Page>
    );
}

PageWrapper.IconClose =  function Header({onLogout,notification,setLoad,infoModal}) {

    return(
    <IconCloseFull >
        <IconButton onClick={()=>notification.modal({title: infoModal.title,text:infoModal.text,open:true,onClick:()=>onLogout({setLoad,notification})})} aria-label="close" icon={'Close'}/>
    </IconCloseFull>
  )
}

PageWrapper.IconBack =  function Header({setPosition,setInfoModal}) {

    function onGoBack() {
        setPosition(position=>position-1)
    }

  return(
    <IconGoBackFull >
        <IconButton onClick={onGoBack} aria-label="goBack" icon={'ArrowBack'}/>
    </IconGoBackFull>
  )
}

PageWrapper.Header =  function Header(props) {
  return(
    <HeaderPage className={'center'}> 
      {props.second ? 
        <Title>Politicas de Privacidade</Title>
      : 
      <>
        <Title >Dados Pessoais</Title>
        <SubTitle>Preencha com seus dados pessoais para prosseguir</SubTitle>
      </>
    }
    </HeaderPage>
    
  )
}

PageWrapper.Input =  function EmailInput({setData,data}) {

  const inputChange = (index) => (event) => {
    console.log(event.target.value)
    let allData = [...data]
    if(index===2) {
        if(TotalNumVerification(event.target.value,11)) {
            allData[index] = {...allData[index],data:event.target.value, status:'OK'}
        } else (
            allData[index] = {...allData[index],data:event.target.value, status:'none'}
        )
    } else {
        if(event.target.value.length<1) {
            allData[index] = {...allData[index],data:event.target.value, status:'none'}
        } else (
            allData[index] = {...allData[index],data:event.target.value, status:'OK'}
        )
    }
    setData(allData)
  }

  const check = (index,value) => {
    let allData = [...data]
    if(index===2) {
        if(TotalNumVerification(value,11)) {
            allData[index] = {...allData[index], status:'OK'}
        } else (
            allData[index] = {...allData[index], status:'Warn',message:'CPF com formatação inválida'}
        )
    } else if (allData[index]?.required && allData[index].required) {
        if(value.length<1) {
            allData[index] = {...allData[index], status:'Warn',message:'Este campo não pode ser nulo'}
        } else (
            allData[index] = {...allData[index], status:'OK'}
        )
    }
    setData(allData)
  }

  return(
    <InputsContainer>
      {data.map((item,index)=>(
        <Input 
            key={index} 
            status={item?.status && item.status} 
            icon={item?.status && item.status}  
            required={item?.required?item.required:false}
            onBlur={({target})=>check(index,target.value)} 
            onChange={inputChange(index)} 
            size={'small'} 
            inputProps={{style: {textTransform: 'capitalize'}}}
            label={item.name}
            title={item.message}
            placeholder={item.placeholder} 
            variant="outlined"  
            validation={(item && item?.status && (item.status === 'Check' || item.status === 'Warn' || item.status === 'Load'))}
        />
      ))}
    </InputsContainer>
  )
}

PageWrapper.Continue =  function Continue({data,setPosition,second,onAddData,checked,position=false}) {

  function disable() {
      
    let resp = false
    if (position) {
      resp = checked?false : true
    } else {
      data?.map((item)=>{
        if (item.status !== 'OK' && item.status !== 'Check') resp = true
      })
    }
    return resp
  }

  function onClickContinue() {
    setPosition(2)
  }

  return(
    <ContinueButton primary={'true'} onClick={second?onAddData:onClickContinue} size={'medium'} disable={`${disable()}`}>
      {second ? 
      <p>Confirmar</p>
      :
      <p>Continuar</p>
      }
    </ContinueButton>
  )
}

PageWrapper.Politics =  function Continue({setChecked,checked}) {
  
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return(
    <>
      <PoliticsContainer >
        <h3>Politicas</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <h3>Seguran</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <h3>Politicas</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <h3>Seguran</h3>
        <p style={{textAlign:'justify',margin:'10px 0px 20px 0px'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </PoliticsContainer>
      <FormLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          name="checkedB"
          color="primary"
        />
        }
        label="Eu li e concordo com os termos de uso e politicas de privacidade"
      />
    </>
  )
}
