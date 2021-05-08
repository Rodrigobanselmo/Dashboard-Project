import React, {useState,useRef} from 'react';
import {Icons} from '../../../../../../components/Icons/iconsDashboard';
import {ModalMui, ModalFullScreen} from '../../../../../../components/Main/MuiHelpers/Modal'
import {HeaderPage,Page,MainTitle,Container,InputsContainer,Title,SubTitle,IconCloseFull,IconGoBackFull} from '../../../../../../components/Dashboard/Components/Standard/PageCarousel'
import {HeaderForm,FormContainer,SubTitleForm,TitleForm,DividerForm,AddAnotherForm,ButtonForm} from '../../../../../../components/Dashboard/Components/Form/comp'
import Input, {InputEnd,InputUnform,SelectedEnd,InputDate} from '../../../../../../components/Main/MuiHelpers/Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../../../lib/textMask'
import * as Yup from 'yup'

export function AddModal({children, ...restProps }) {
    return (
        <ModalFullScreen {...restProps}>
          <Container style={{padding:0}}>
            {children}
          </Container>
        </ModalFullScreen>
    );
}

AddModal.Header =  function Header({first,second,...props}) {
  return(
    <HeaderPage {...props} className={'center'}>
        <Title >Cadastro de Empregado</Title>
        {/* <SubTitle style={{marginBottom:'20px'}}>É importante informar corretamente a estrutura organizacional da unidade para que possamos captar os dados da melhor maneira possivel.</SubTitle> */}
    </HeaderPage>
  )
}

AddModal.LastInput =  function InputLast({unform,setUnform,notification,setPosition}) {

  const formRef = useRef()

  const handleDateChange = (date) => {
    if (date == null) return setUnform(unform=>({...unform,creation:new Date()}))
    setUnform(unform=>({...unform,creation:date}))
  };

  const handleDateChangeEnd = (date) => {
    if (date && date !== 'Invalid Date') setUnform(unform=>({...unform,end:date,status:'Desligado'}))
    else if (!date) setUnform(unform=>({...unform,end:date,status:'Ativo'}))
    else setUnform(unform=>({...unform,end:date,status:'Ativo'}))

  };

  const handleSelection = (selected) => {

    if (unform.end && unform.end !== 'Invalid Date' && selected != 'Desligado') setUnform(unform=>({...unform,end:null,status:selected}))
    if ((!unform.end || unform.end == 'Invalid Date') && selected == 'Desligado') notification.error({message:'Selecione uma data de desligamento para mudar o status.',modal:true})
    else setUnform(unform=>({...unform,status:selected}))
  };

  const validation = Yup.object({
    name: Yup.string().required('Nome do empregado não pode estar vazio.'),
    cpf: Yup.string().required('O campo CPF é obrigatório.').trim('CPF inválido').strict(),
  })

  const handleSubmit = React.useCallback(async (formData) => {
    formRef.current.setErrors({})
    try {
      await validation.validate(formData, { abortEarly: false })
      if (!unform.creation || unform.creation == 'Invalid Date') {
        notification.error({message:'Data de início inválida',modal:true})
      } else if (unform.end == 'Invalid Date') {
        notification.error({message:'Data de desligamento inválida',modal:true})
      } else if (unform.status == 'Desligado' && (!unform.end || unform.end == 'Invalid Date')) {
        notification.error({message:'É necessário informar data de desligamento válida.',modal:true})
      } else {
        setUnform(unform=>({...unform,...formData}))
        setPosition(position=>position+1)
      }
    } catch (error) {
      console.log('error',error);
      const errors = {}
      error?.inner?.forEach((err) => {
        errors[err.path] = err.message
      })
      formRef.current?.setErrors(errors)
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
          width={'75%'}
          required
          name={'name'}
          labelWidth={122}
          label={'Nome completo'}
          status={'Normal'}
          variant="outlined"
          inputProps={{style: {textTransform: 'capitalize'}}}
          style={{marginRight:20}}
        />
        <SelectedEnd
          width={'25%'}
          label={'Status'}
          labelWidth={42}
          selected={['Ativo','Afastado','Desligado'].findIndex(i=>i==unform.status)+1}
          value={['Ativo','Afastado','Desligado'].findIndex(i=>i==unform.status)+1}
          setData={handleSelection}
          data={['Ativo','Afastado','Desligado']}
          variant="outlined"
        />
        <InputUnform
          width={'100%'}
          name={'cpf'}
          labelWidth={35}
          label={'CPF'}
          status={'Normal'}
          variant="outlined"
          inputComponent={NumberFormatCPF}
        />
        <InputDate
          value={unform.creation}
          onChange={handleDateChange}
          style={{width:'calc(50% - 10px)',marginRight:20}}
          label="Data de contratação"
        />
        <InputDate
          value={unform.end}
          onChange={handleDateChangeEnd}
          style={{width:'calc(50% - 10px)'}}
          label="Data de desligamento"
        />
        <ButtonForm type='submit' justfy='center' primary={'true'} style={{width:'fit-content'}}>
          Continuar
        </ButtonForm>
      </FormContainer>
    </InputsContainer>
  )
}

