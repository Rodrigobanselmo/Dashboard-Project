import React, {useState,useRef} from 'react';
import {Icons} from '../../../../components/Icons/iconsDashboard';
import {Selection} from './style';
import {ModalMui, ModalFullScreen} from '../../../../components/Main/MuiHelpers/Modal'
import {BootstrapTooltip} from '../../../../components/Main/MuiHelpers/Tooltip'
import RichSelect from '../../../../components/Dashboard/Components/MultUsage/RichSelect'
import useTimeOut from '../../../../hooks/useTimeOut';
import {keepOnlyNumbers} from '../../../../helpers/StringHandle';
import {ContinueButton} from '../../../../components/Main/MuiHelpers/Button'
import {UserContainer,UserAvatar,GroupIcon,TextNameEmail} from '../../../../components/Dashboard/Components/Standard/Avatar'
import Input, {InputEnd,InputUnform,SelectedEnd} from '../../../../components/Main/MuiHelpers/Input'
import InputMask from '../../../../components/Main/MuiHelpers/InputMask'
import {HeaderPage,Page,MainTitle,Container,InputsContainer,Title,SubTitle,IconCloseFull,IconGoBackFull} from '../../../../components/Dashboard/Components/Standard/PageCarousel'
import { isValid } from "@fnando/cnpj";
import styled from "styled-components";
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../lib/textMask'
import {HeaderForm,FormContainer,SubTitleForm,TitleForm,DividerForm,AddAnotherForm,ButtonForm} from '../../../../components/Dashboard/Components/Form/comp'
import { useField } from '@unform/core'
import * as Yup from 'yup'

export default function AddCompany({children, ...restProps }) {
    return (
        <ModalFullScreen {...restProps}>
          <Container style={{padding:0}}>
            {children}
          </Container>
        </ModalFullScreen>
    );
}

AddCompany.Header =  function Header({first,second,...props}) {
  return(
    <HeaderPage {...props} className={'center'}>
      {first ?
      <>
        <Title >Qual a Estrutura Organizacional da Unidade?</Title>
        <SubTitle style={{marginBottom:'20px'}}>É importante informar corretamente a estrutura organizacional da unidade para que possamos captar os dados da melhor maneira possivel.</SubTitle>
      </>
      :
      second ?
      <>
        <Title >Cadastrar empresa com CNPJ</Title>
        <SubTitle>Para realizar o cadastro da empresa é necessario informar um CNPJ válido.</SubTitle>
      </>
      :
      <>
        <Title >Cadastrar responsáveis pela empresa</Title>
        <SubTitle>O cadastro do responsaivel legal da empresa poderá ser feito em outro momento, entretanto ele é essencial para gerar documentos e, portanto necessitará ser preenchido futuramente.</SubTitle>
      </>
    }
    </HeaderPage>

  )
}

AddCompany.Type =  function Type({companiesTypes,setData,data,setPosition,setInfoModal,position}) {

  function setSelected(type) {
    setData(data=>({...data,type}))
    setPosition(2)
    setInfoModal({title:'Você tem certeza?',text:'Ao sair você irá perder as informaçoes inseridas anteriormente.'})
  }

  return(
      <div className={'center'} style={{width:'100%',maxWidth:'600px',justifyContent:'space-between',flexDirection:'row'}} >
      {companiesTypes.map((item,index)=>(
        <div key={index}>
          <BootstrapTooltip placement="bottom" TransitionProps={{ timeout: {enter:2000, exit: 50} }} title={item.text} styletooltip={{transform: 'translateY(10px)',fontSize:17,maxWidth:600,display:position!== 1?'none' : 'show'}}>
            <Selection onClick={()=>setSelected(item.type)} selected={data?.type && data.type === item.type} key={index} className={'center'} >
              {item.type}
            </Selection>
          </BootstrapTooltip>
        </div>
      ))}
    </div>
  )
}

AddCompany.Input =  function EmailInput({setData,data,onCheckCNPJExists,notification,companyId}) {

  const [onTimeOut,onClearTime] = useTimeOut()

  const addCNPJ = (event) => {
    onClearTime()
    onTimeOut(()=>checkCNPJ(event.target.value),1000)
    let fullData = {...data}
    if (event.target.value && event.target.value.length > 12) {
      fullData = {...fullData,CNPJ:event.target.value, status:'Load',message:'Carregando...'}
      setData(fullData)
    } else if (fullData.CNPJ){
      fullData = {...fullData,CNPJ:'', status:'none',message:''}
      setData(fullData)
    }
  }

  const checkCNPJ = (value) => {

    if (isValid(value)) {
      if (data.CNPJ !== value) {
        setData(data=>({...data,CNPJ:value, status:'Load',message:'Carregando...'}))
        onCheckCNPJExists(value,companyId,setData,notification)
      }
    } else if (value && value.length == 14) {
        setData(data=>({...data,CNPJ:value, status:'Warn',message:'CNPJ mal formatado'}))
    } else if (value=='') {
        setData(data=>({...data,CNPJ:value, status:'none',message:''}))
    }
  }


  return(
    <InputsContainer>
        <InputEnd
            width={'100%'}
            status={data?.status && data.status}
            icon={data?.status && data.status}
            onChange={addCNPJ}
            size={'small'}
            labelWidth={42}
            name={'responsavel'}
            label={'CNPJ'}
            title={data.message}
            variant="outlined"
            validation={(data && data?.status && (data.status === 'Check' || data.status === 'Warn' || data.status === 'Load'))}
            inputComponent={NumberFormatCNPJ}
          />
    </InputsContainer>
  )
}

AddCompany.LastInput =  function InputLast({onNewCompany,unform}) {

  const formRef = useRef()

  const validation = Yup.object({})

  const handleSubmit = React.useCallback(async (formData) => {
    formRef.current.setErrors({})
    try {
      await validation.validate(formData, { abortEarly: false })
      onNewCompany({...unform,...formData})
      console.log('submitted: ', formData)
    } catch (error) {
      console.log('error',error);
    }
  }, [unform])

  return(
    <InputsContainer>
      <FormContainer
         noValidate
         ref={formRef}
         onSubmit={handleSubmit}
      >
        <InputUnform
            width={'100%'}
            name={'responsavel'}
            title={'O Representante Legal é pessoa que possui o nome no contrato social da empresa, seja como dono, sócio ou sócio administrativo. É, portanto, quem representa a empresa diante da Receita Federal e sociedade.'}
            labelWidth={300}
            label={'Responsavel Legal'}
            status={'Normal'}
            icon={'Info'}
            validation={true}
            variant="outlined"
            inputProps={{style: {textTransform: 'capitalize'}}}
            option={'OBRIGATÓRIO EM DOCUMENTOS'}
          />
{/*
        <InputEnd
            width={'70%'}
            value={data.fiscal}
            title={'O Fiscal de Contrato é a pessoa que está responsavel por exigir o fiel cumprimento do contrato e a qualidade nos bens ou serviços entregues.'}
            onChange={({target})=>setData(data=>({...data,fiscal:target.value}))}
            labelWidth={140}
            label={'Fiscal de Contrato'}
            status={'Normal'}
            icon={'Info'}
            validation={true}
            variant="outlined"
            option
            inputProps={{style: {textTransform: 'capitalize'}}}
            style={{marginRight:20}}
          />
        <InputEnd
            width={'30%'}
            title={'Telefone celular para contato do fiscal de contrato.'}
            value={(keepOnlyNumbers(data.fiscalCell))}
            onChange={({target})=>setData(data=>({...data,fiscalCell:target.value}))}
            labelWidth={52}
            label={'Celular'}
            status={'Normal'}
            icon={'Info'}
            option
            validation={true}
            variant="outlined"
            inputComponent={NumberFormatCell}
          />
          </FormContainer> */}
        <InputUnform
            width={'100%'}
            name={'identificacao'}
            title={'Nome personalizado da empresa contratante para melhor identificação.'}
            labelWidth={185}
            label={'Indentificão da Empresa'}
            status={'Normal'}
            option
            icon={'Info'}
            validation={true}
            variant="outlined"
            inputProps={{style: {textTransform: 'capitalize'}}}
          />
        <InputUnform
            width={'100%'}
            name={'supervisorEmail'}
            title={'Email do surpervisor das atividades, aquele que está responsavel por determinar as medidas que serão tomadas.'}
            labelWidth={150}
            label={'Email do Supervisor'}
            status={'Normal'}
            option
            icon={'Info'}
            validation={true}
            variant="outlined"
          />
        <ButtonForm type='submit' justfy='center' primary={'true'} style={{width:'fit-content'}}>
          Criar Empresa
        </ButtonForm>
      </FormContainer>
    </InputsContainer>
  )
}

AddCompany.Form =  function Form({setUnform,data,setData,receitaFederal,setReceitaFederal,setPosition}) {

  const formRef = useRef()

  const validation = Yup.object({
    nome: Yup.string().required('Nome da empresa não pode estar vazio.'),
/*     password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'), */
  })

  const handleSubmit = React.useCallback(async (formData) => {

    formRef.current.setErrors({})

    let form = {...formData}
    form.tipo = receitaFederal.tipo
    let address = {...form.address}
    address.uf = receitaFederal.uf

    try {
      await validation.validate(formData, { abortEarly: false })
      setPosition(position=>position+1)
      setUnform({...form,address})
      console.log('submittedOK: ', formData)
    } catch (error) {
      console.log('error',error);
      const errors = {}
      console.log('submittedError: ', formData)
      error?.inner?.forEach((err) => {
        errors[err.path] = err.message
      })

      formRef.current?.setErrors(errors)
    }
  }, [receitaFederal])

  return(
    <FormContainer
      noValidate
      ref={formRef}
      onSubmit={handleSubmit}
      key={`${data.CNPJ}${receitaFederal.nome}`}
    >
      <HeaderForm className={'center'}>
        <TitleForm >Ultimas informaçãoes para cadastro da empresa</TitleForm>
        <SubTitleForm style={{marginBottom:'0px'}}>Os dados são obtidos a partir do site da Receita Federal e podem não ser os mais atualizados, confira e altera caso necessário.</SubTitleForm>
      </HeaderForm>
      <DividerForm >Principal</DividerForm>
      <InputUnform
          required
          width={'75%'}
          name="cnpj"
          labelWidth={45}
          label={'CNPJ'}
          defaultValue={keepOnlyNumbers(data.CNPJ)}
          disabled={true}
          status={'Normal'}
          variant="outlined"
          style={{marginRight:20}}
          inputComponent={NumberFormatCNPJ}
        />
      <SelectedEnd
          width={'25%'}
          label={'Tipo'}
          labelWidth={36}
          title={receitaFederal.tipo === data.type.toUpperCase() ? '' : 'O dado referente ao tipo de empresa obtido pela Receita Federal é inconsistente com o informado anteriormente. Estando ciente disso você pode mudar ou manter como está.'}
          status={'Warn'}
          icon={('Warn')}
          selected={1}
          value={1}
          setData={(selected)=>setData(data=>({...data,type:selected}))}
          data={[data.type.toUpperCase(),receitaFederal.tipo]}
          sliceItems={receitaFederal?.tipo && receitaFederal.tipo === data.type.toUpperCase() ? 2:false}
          variant="outlined"
          />
      <InputUnform
          required
          width={'100%'}
          name="nome"
          defaultValue={receitaFederal.nome}
          labelWidth={100}
          label={'Razão Social'}
          title={'Nome da Empresa'}
          status={'Normal'}
          icon={'Info'}
          variant="outlined"
          />
      <InputUnform
          width={'100%'}
          defaultValue={receitaFederal.fantasia}
          name="fantasia"
          labelWidth={73}
          label={'Fantasia'}
          status={'Normal'}
          variant="outlined"
      />
      <DividerForm >Área de Atuação Principal</DividerForm>
        <InputUnform
            width={'70%'}
            name="atividade_principal[0].text"
            defaultValue={receitaFederal.atividade_principal[0].text}
            labelWidth={125}
            label={'Atuação Prinpical'}
            status={'Normal'}
            icon={'Info'}
            variant="outlined"
            style={{marginRight:20}}
        />
        <InputUnform
            width={'30%'}
            defaultValue={(keepOnlyNumbers(receitaFederal.atividade_principal[0].code))}
            name="atividade_principal[0].code"
            labelWidth={40}
            label={'CNAE'}
            status={'Normal'}
            icon={'Info'}
            variant="outlined"
            inputComponent={NumberFormatCNAE}
        />
        <DividerForm >Áreas de Atuação Secundária</DividerForm>
        {receitaFederal.atividades_secundarias.map((item,index)=>(
          <div style={{width:'100%'}} key={index}>
            <InputUnform
                width={'70%'}
                defaultValue={receitaFederal.atividades_secundarias[index].text}
                name={`atividades_secundarias[${index}].text`}
                labelWidth={125}
                label={'Atuação Prinpical'}
                status={'Normal'}
                icon={'Info'}
                variant="outlined"
                style={{marginRight:20}}
            />
            <InputUnform
                width={'30%'}
                name={`atividades_secundarias[${index}].code`}
                defaultValue={(keepOnlyNumbers(receitaFederal.atividades_secundarias[index].code))}
                labelWidth={40}
                label={'CNAE'}
                status={'Normal'}
                icon={'Info'}
                variant="outlined"
                inputComponent={NumberFormatCNAE}
            />
          </div>
        ))}
        <AddAnotherForm onClick={()=>setReceitaFederal(data=>({...data,atividades_secundarias:[...data.atividades_secundarias,{text:'',code:''}]}))}>Adicionar Outra</AddAnotherForm>
        <DividerForm >Localidade</DividerForm>
        <InputUnform
            width={'50%'}
            defaultValue={receitaFederal.logradouro}
            name={`address.logradouro`}
            labelWidth={75}
            label={'Logradouro'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <InputUnform
            width={'15%'}
            defaultValue={receitaFederal.numero}
            name={`address.numero`}
            labelWidth={63}
            label={'Número'}
            variant="outlined"
            style={{marginRight:20}}
            inputComponent={NumberFormatOnly}
            />
        <InputUnform
            width={'35%'}
            defaultValue={receitaFederal.complemento}
            name={`address.complemento`}
            labelWidth={96}
            label={'Complemento'}
            icon={'Info'}
            variant="outlined"
            />
        <InputUnform
            width={'20%'}
            defaultValue={(keepOnlyNumbers(receitaFederal?.cep))}
            name={`address.cep`}
            labelWidth={33}
            label={'CEP'}
            variant="outlined"
            style={{marginRight:20}}
            inputComponent={NumberFormatCEP}
            />
        <InputUnform
            width={'30%'}
            defaultValue={receitaFederal?.bairro}
            name={`address.bairro`}
            labelWidth={50}
            label={'Bairro'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <InputUnform
            width={'40%'}
            defaultValue={receitaFederal?.municipio}
            name={`address.municipio`}
            labelWidth={70}
            label={'Município'}
            icon={'Info'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <SelectedEnd
            width={'10%'}
            labelWidth={25}
            label={'UF'}
            selected={receitaFederal.estados.findIndex(i=>i===receitaFederal.uf)+1}
            setData={(selected)=>setReceitaFederal(data=>({...data,uf:selected}))}
            data={receitaFederal.estados}
            variant="outlined"
            />
        <DividerForm >Contato</DividerForm>
        <InputUnform
          width={'100%'}
          defaultValue={receitaFederal?.email ?? receitaFederal.email}
          name={`contact.email`}
          labelWidth={135}
          title={'Endereço de email cadastrado na Receita Federal'}
          status={'Normal'}
          icon={'Info'}
          label={'Endereço de Email'}
          variant="outlined"
        />
        <InputUnform
          width={'50%'}
          defaultValue={keepOnlyNumbers(receitaFederal?.telefone ?? receitaFederal.telefone)}
          name={`contact.telefone`}
          labelWidth={70}
          label={'Telefone'}
          variant="outlined"
          style={{marginRight:20}}
          inputComponent={NumberFormatTel}
        />
        <InputUnform
          width={'50%'}
          defaultValue={keepOnlyNumbers(receitaFederal?.celular ?? receitaFederal.celular)}
          name={`contact.celular`}
          labelWidth={52}
          label={'Celular'}
          variant="outlined"
          inputComponent={NumberFormatCell}
        />
        <ButtonForm type='submit' primary={'true'}>Continuar</ButtonForm>
    </FormContainer>
  )
}

AddCompany.Continue =  function Continue({disable=false,setPosition,notification,onGetCNPJ,data,setData,setLoad,setReceitaFederal,done,onNewCompany}) {

  function onClickContinue(event) {
    if (done) {
      onNewCompany()
    } else {
      setLoad(true)
      onGetCNPJ(data.CNPJ,setData,notification,setReceitaFederal,setPosition,setLoad)
      //setPosition(po=>po+1)
    }
  }

  return(
    <ContinueButton primary={'true'} onClick={onClickContinue} size={'medium'} disable={`${false}`}>
      {done ?
      <p>Criar Empresa</p>
      :
      <p>Continuar</p>
      }
    </ContinueButton>
  )
}
