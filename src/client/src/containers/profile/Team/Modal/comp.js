import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {Icons} from '../../../../components/Icons/iconsDashboard';
import {
  InputEmail,
  Container,
  HeaderPage,
  Title,
  EmailContainer,
  SubTitle,
  TypeContainer,
/*   ContinueButton, */
  Icon,
  AddAnother,
} from './style';
import {ModalMui, ModalFullScreen} from '../../../../components/Main/MuiHelpers/Modal'
import {BootstrapTooltip} from '../../../../components/Main/MuiHelpers/Tooltip'
import RichSelect from '../../../../components/Dashboard/Components/MultUsage/RichSelect'
import useTimeOut from '../../../../hooks/useTimeOut';
import {EmailVerification} from '../../../../helpers/StringVerification';
import {ContinueButton} from '../../../../components/Main/MuiHelpers/Button'
import {UserContainer,UserAvatar,GroupIcon,TextNameEmail} from '../../../../components/Dashboard/Components/Standard/Avatar'
import Input from '../../../../components/Main/MuiHelpers/Input'



export default function AddModal({children, ...restProps }) {
    return (
        <ModalFullScreen {...restProps}>
          <Container> 
            {children}
          </Container>
        </ModalFullScreen>
    );
}

AddModal.Header =  function Header(props) {
  return(
    <HeaderPage className={'center'}> 
      {props.second ? 
      <>
        <Title>Definir permissões</Title>
        <SubTitle>Defina o tipo dos novos usuários e quais serão suas permissões de uso da plataforma.</SubTitle>
      </>
      : 
      <>
        <Title>Adicionar Novo Usuários</Title>
        <SubTitle>Você poderá mudar as permissões dos novos usuários na proxima sessão</SubTitle>
      </>
    }
    </HeaderPage>
    
  )
}

AddModal.Type =  function Type(props) {

  const types = [];
  props.userTypes.map((item)=>{
    if (item?.name) types.push(item.name)
  })

  function setSelected(user,type) { 
    const allEmails = [...props.emails] 
    let index = props.emails.findIndex(i=>i?.email && i.email===user.email)
    allEmails[index].type = type
    allEmails[index].access = props.userTypes[props.userTypes.findIndex((i)=>i.name===type)].access
    allEmails[index].icon = props.userTypes[props.userTypes.findIndex(i=>i?.name && i.name===type)].icon
    props.setEmails(allEmails)
  }

  return(
    <div style={{marginBottom:25,width:'100%'}}>
      {props.noRepeatEmails.map((user,index)=>(
        <TypeContainer key={index} className={'rowCenter'}> 
        <UserContainer >
            <UserAvatar background style={{marginLeft:0}} >
                <GroupIcon style={{fontSize:28}} type={user?.icon ? user.icon  : 'Add'}/>
            </UserAvatar> 
            <TextNameEmail style={{textTransform:'lowercase'}} >{user.email}</TextNameEmail>
        </UserContainer>
        <RichSelect setSelected={(type)=>setSelected(user,type)} selected={user.type !=='' ? user.type : 'Selecione'} attention dataToSelect={types}/>
      </TypeContainer>
      ))}
    </div>
    
  )
}

AddModal.EmailInput =  function EmailInput({numInput,setNumInput,setEmails,emails,onCheckUser,notification,companyId}) {

  const [onTimeOut,onClearTime] = useTimeOut()

  const addEmail = (index) => (event) => {
    onClearTime()
    onTimeOut(()=>checkEmail(index,event.target.value),1000)
    let allEmails = [...emails]
    if (event.target.value && event.target.value.length > 10) {
      allEmails[index] = {email:event.target.value, status:'Load',type:'',message:'Carregando...'}
    } else {
      allEmails[index] = {email:event.target.value, status:'none',type:'',message:''}
    }
    setEmails(allEmails)
  }

  const checkEmail = (index,value) => {
    let allEmails = [...emails]
    
    if (EmailVerification(value)) {
      if (allEmails[index].email !== value) {
        allEmails[index] = {...allEmails[index],email:value, status:'Load',message:'Email válido',type:''}
        setEmails(allEmails)
        onCheckUser(value,companyId,index,setEmails,emails,notification)
      }
    } else if (value && value.length > 5) {
      allEmails[index] = {...allEmails[index],email:value, status:'Warn',message:'Email mal formatado',type:''}
      setEmails(allEmails)
    } else {
      allEmails[index] = {...allEmails[index],email:value, status:'none',message:'',type:''}
      setEmails(allEmails)
    }
  }


  return(
    <EmailContainer>
      {[...Array(numInput)].map((i,index)=>(
        <Input key={index} status={emails[index]?.status && emails[index].status} icon={emails[index]?.status && emails[index].status} validation={(emails && emails[index] && emails[index]?.status && (emails[index].status === 'Check' || emails[index].status === 'Warn' || emails[index].status === 'Load'))} onBlur={({target})=>checkEmail(index,target.value)} onChange={addEmail(index)} size={'small'} label="Email" variant="outlined"  />
      ))}
      <AddAnother onClick={()=>setNumInput(numInput=>numInput+1)}><p>Adicionar Outro</p></AddAnother>
    </EmailContainer>
  )
}

AddModal.Continue =  function Continue({disable,setPosition,setInfoModal,second,onSendRequest,notification}) {

  function onClickContinue() {
    setPosition(2)
    setInfoModal({title:'Você tem certeza?',text:'Ao sair você irá perder as informaçoes inseridas anteriormente.'})
    
/*     setTimeout(() => {
      notification.info({message:'Email na secção anterios estão com formatação inválida',modal:true})
    }, 1000); */
  }

  return(
    <ContinueButton primary={'true'} onClick={second?onSendRequest:onClickContinue} size={'medium'} disable={`${disable}`}>
      {second ? 
      <p>Convidar Membros</p>
      :
      <p>Continuar</p>
      }
    </ContinueButton>
  )
}
