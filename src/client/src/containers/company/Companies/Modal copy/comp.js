import React, {useState} from 'react';
import {Icons} from '../../../../components/Icons/iconsDashboard';
import {Selection} from './style';
import {ModalMui, ModalFullScreen} from '../../../../components/Main/MuiHelpers/Modal'
import {BootstrapTooltip} from '../../../../components/Main/MuiHelpers/Tooltip'
import RichSelect from '../../../../components/Dashboard/Components/MultUsage/RichSelect'
import useTimeOut from '../../../../hooks/useTimeOut';
import {keepOnlyNumbers} from '../../../../helpers/StringHandle';
import {ContinueButton} from '../../../../components/Main/MuiHelpers/Button'
import {UserContainer,UserAvatar,GroupIcon,TextNameEmail} from '../../../../components/Dashboard/Components/Standard/Avatar'
import Input, {InputEnd,SelectedEnd} from '../../../../components/Main/MuiHelpers/Input'
import InputMask from '../../../../components/Main/MuiHelpers/InputMask'
import {HeaderPage,Page,MainTitle,Container,InputsContainer,Title,SubTitle,IconCloseFull,IconGoBackFull} from '../../../../components/Dashboard/Components/Standard/PageCarousel'
import { isValid } from "@fnando/cnpj";
import styled from "styled-components";
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../lib/textMask'
import {HeaderForm,FormContainer,SubTitleForm,TitleForm,DividerForm,AddAnotherForm,ButtonForm} from '../../../../components/Dashboard/Components/Form/comp'


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
    if (event.target.value && event.target.value.length > 10) {
      fullData = {...fullData,CNPJ:event.target.value, status:'Load',message:'Carregando...'}
    } else {
      fullData = {...fullData,CNPJ:event.target.value, status:'none',message:''}
    }
    setData(fullData)
  }

  const checkCNPJ = (value) => {

    if (isValid(value)) {
      if (data.CNPJ !== value) {
        setData(data=>({...data,CNPJ:value, status:'Load',message:'Carregando...'}))
        onCheckCNPJExists(value,companyId,setData,notification)
      }
    } else if (value) {
        setData(data=>({...data,CNPJ:value, status:'Warn',message:'CNPJ mal formatado'}))
    } else {
        setData(data=>({...data,CNPJ:value, status:'none',message:''}))
    }
  }


  return(
    <InputsContainer>
        <Input
            style={{width:'100%'}}
            status={data?.status && data.status}
            icon={data?.status && data.status}
            onChange={addCNPJ}
            size={'small'}
            label={'CNPJ'}
            title={data.message}
            variant="outlined"
            validation={(data && data?.status && (data.status === 'Check' || data.status === 'Warn' || data.status === 'Load'))}
            InputProps={{
              inputComponent: NumberFormatCNPJ,
            }}
        />
    </InputsContainer>
  )
}

AddCompany.LastInput =  function InputLast({setData,data}) {

  return(
    <InputsContainer>
        <InputEnd
            width={'100%'}
            title={'O Representante Legal é pessoa que possui o nome no contrato social da empresa, seja como dono, sócio ou sócio administrativo. É, portanto, quem representa a empresa diante da Receita Federal e sociedade.'}
            value={data.responsavel}
            onChange={({target})=>setData(data=>({...data,responsavel:target.value}))}
            labelWidth={300}
/*             labelWidth={135} */
            label={'Responsavel Legal'}
            status={'Normal'}
            icon={'Info'}
            validation={true}
            variant="outlined"
            inputProps={{style: {textTransform: 'capitalize'}}}
            option={'OBRIGATÓRIO EM DOCUMENTOS'}
          />
{/*         <FormContainer>
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
        <InputEnd
            width={'100%'}
            title={'Nome personalizado da empresa contratante para melhor identificação.'}
            value={data.identificacao}
            onChange={({target})=>setData(data=>({...data,identificacao:target.value}))}
            labelWidth={175}
            label={'Indentificão da Empresa'}
            status={'Normal'}
            option
            icon={'Info'}
            validation={true}
            variant="outlined"
            inputProps={{style: {textTransform: 'capitalize'}}}
          />
        <InputEnd
            width={'100%'}
            title={'Email do surpervisor das atividades, aquele que está responsavel por determinar as medidas que serão tomadas.'}
            value={data.supervisor}
            onChange={({target})=>setData(data=>({...data,supervisor:target.value}))}
            labelWidth={175}
            label={'Email do Supervisor'}
            status={'Normal'}
            option
            icon={'Info'}
            validation={true}
            variant="outlined"
          />

    </InputsContainer>
  )
}

AddCompany.Form =  function Form({data,setData,receitaFederal,setReceitaFederal,setPosition}) {

  function changeArrayText(data,value,index) {
    let object = {...data}
    let array = [...object.atividades_secundarias]
    array[index] = {...array[index],text:value}
    object.atividades_secundarias = array
    return object
  }
  function changeArrayCode(data,value,index) {
    let object = {...data}
    let array = [...object.atividades_secundarias]
    array[index] = {...array[index],code:value}
    object.atividades_secundarias = array
    return object
  }

  return(
    <FormContainer >
      <HeaderForm className={'center'}>
        <TitleForm >Ultimas informaçãoes para cadastro da empresa</TitleForm>
        <SubTitleForm style={{marginBottom:'0px'}}>Os dados são obtidos a partir do site da Receita Federal e podem não ser os mais atualizados, confira e altera caso necessário.</SubTitleForm>
      </HeaderForm>
      <DividerForm >Principal</DividerForm>
      <InputEnd
          width={'75%'}
          value={(keepOnlyNumbers(data.CNPJ))}
          labelWidth={45}
          label={'CNPJ'}
          status={'Normal'}
          validation={false}
          variant="outlined"
          style={{marginRight:20}}
          inputComponent={NumberFormatCNPJ}
          />
      <SelectedEnd
          width={'25%'}
          label={'Tipo'}
          labelWidth={36}
          title={'O dado referente ao tipo de emrpesa obtido pela Receita Federal é inconsistente com o informado anteriormente. Estando ciente disso você pode mudar ou manter como está.'}
          status={'Warn'}
          icon={('Warn')}
          selected={1}
          value={1}
          setData={(selected)=>setData(data=>({...data,type:selected}))}
          data={[data.type.toUpperCase(),receitaFederal.tipo]}
          sliceItems={receitaFederal?.tipo && receitaFederal.tipo === data.type.toUpperCase() ? 2:false}
          variant="outlined"
          />
      <InputEnd
          width={'100%'}
          value={receitaFederal.nome}
          onChange={({target})=>setReceitaFederal(data=>({...data,nome:target.value.toUpperCase()}))}
          labelWidth={100}
          label={'Razão Social'}
          title={'Nome da Empresa'}
          status={'Normal'}
          icon={'Info'}
          validation={true}
          variant="outlined"
          />
      <InputEnd
          width={'100%'}
          value={receitaFederal.fantasia}
          onChange={({target})=>setReceitaFederal(data=>({...data,fantasia:target.value.toUpperCase()}))}
          labelWidth={73}
          label={'Fantasia'}
          status={'Normal'}
          variant="outlined"
      />
      <DividerForm >Área de Atuação Principal</DividerForm>
        <InputEnd
            width={'70%'}
            value={receitaFederal.atividade_principal[0].text}
            onChange={({target})=>setReceitaFederal(data=>({...data,atividade_principal:[{...data.atividade_principal[0],text:target.value}]}))}
            labelWidth={125}
            label={'Atuação Prinpical'}
            status={'Normal'}
            icon={'Info'}
            variant="outlined"
            style={{marginRight:20}}
        />
        <InputEnd
            width={'30%'}
            value={(keepOnlyNumbers(receitaFederal.atividade_principal[0].code))}
            onChange={({target})=>setReceitaFederal(data=>({...data,atividade_principal:[{...data.atividade_principal[0],code:target.value}]}))}
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
            <InputEnd
                width={'70%'}
                value={item.text}
                onChange={({target})=>setReceitaFederal(data=>changeArrayText(data,target.value,index))}
                labelWidth={125}
                label={'Atuação Prinpical'}
                status={'Normal'}
                icon={'Info'}
                variant="outlined"
                style={{marginRight:20}}
            />
            <InputEnd
                width={'30%'}
                value={(keepOnlyNumbers(item.code))}
                onChange={({target})=>setReceitaFederal(data=>changeArrayCode(data,target.value,index))}
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
        <InputEnd
            width={'50%'}
            value={receitaFederal.logradouro}
            onChange={({target})=>setReceitaFederal(data=>({...data,logradouro:target.value}))}
            labelWidth={75}
            label={'Logradouro'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <InputEnd
            width={'15%'}
            value={receitaFederal.numero}
            onChange={({target})=>setReceitaFederal(data=>({...data,numero:target.value}))}
            labelWidth={63}
            label={'Número'}
            variant="outlined"
            style={{marginRight:20}}
            inputComponent={NumberFormatOnly}
            />
        <InputEnd
            width={'35%'}
            value={receitaFederal.complemento}
            onChange={({target})=>setReceitaFederal(data=>({...data,complemento:target.value}))}
            labelWidth={96}
            label={'Complemento'}
            icon={'Info'}
            variant="outlined"
            />
        <InputEnd
            width={'20%'}
            value={(keepOnlyNumbers(receitaFederal.cep))}
            onChange={({target})=>setReceitaFederal(data=>({...data,cep:target.value}))}
            labelWidth={33}
            label={'CEP'}
            variant="outlined"
            style={{marginRight:20}}
            inputComponent={NumberFormatCEP}
            />
        <InputEnd
            width={'30%'}
            value={receitaFederal.bairro}
            onChange={({target})=>setReceitaFederal(data=>({...data,bairro:target.value}))}
            labelWidth={50}
            label={'Bairro'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <InputEnd
            width={'40%'}
            value={receitaFederal.municipio}
            onChange={({target})=>setReceitaFederal(data=>({...data,municipio:target.value}))}
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
        <InputEnd
          width={'100%'}
          value={receitaFederal.email}
          onChange={({target})=>setReceitaFederal(data=>({...data,email:target.value}))}
          labelWidth={135}
          title={'Endereço de email cadastrado na Receita Federal'}
          status={'Normal'}
          icon={'Info'}
          label={'Endereço de Email'}
          variant="outlined"
        />
        <InputEnd
          width={'50%'}
          value={(keepOnlyNumbers(receitaFederal.telefone))}
          onChange={({target})=>setReceitaFederal(data=>({...data,telefone:target.value}))}
          labelWidth={70}
          label={'Telefone'}
          variant="outlined"
          style={{marginRight:20}}
          inputComponent={NumberFormatTel}
        />
        <InputEnd
          width={'50%'}
          value={(keepOnlyNumbers(receitaFederal.celular))}
          onChange={({target})=>setReceitaFederal(data=>({...data,celular:target.value}))}
          labelWidth={52}
          label={'Celular'}
          variant="outlined"
          inputComponent={NumberFormatCell}
        />
        <ButtonForm onClick={()=>setPosition(position=>position+1)} primary={'true'}>Continuar</ButtonForm>
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
    }
  }

  return(
    <ContinueButton primary={'true'} onClick={onClickContinue} size={'medium'} disable={`${disable}`}>
      {done ?
      <p>Criar Empresa</p>
      :
      <p>Continuar</p>
      }
    </ContinueButton>
  )
}
