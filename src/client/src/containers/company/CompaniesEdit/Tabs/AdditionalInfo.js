import React, {useRef,useCallback,useEffect,useState} from 'react';
import {Icons} from '../../../../components/Icons/iconsDashboard.js';
import {
  ContainerDiv,
  ButtonContainer
} from '../styles';
import {onGetCompanie} from '../func'
import {keepOnlyNumbers} from '../../../../helpers/StringHandle';
import Tabs from '../../../../components/Main/MuiHelpers/Tabs'
import {LoadingContent} from '../../../../components/Main/Loader/LoadingContent'
import {estados} from '../../../../constants/geral'
import {InputEnd,InputUnform,SelectedEnd} from '../../../../components/Main/MuiHelpers/Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../lib/textMask'
import {
  HeaderForm,
  FormContainer,
  SubTitleForm,
  TitleForm,DividerForm,
  ButtonForm
} from '../../../../components/Dashboard/Components/Form/comp'
import { useField } from '@unform/core'
import * as Yup from 'yup'


export function AdditionalInfo({data,setData}) {

  const formRef = useRef()

  const validation = Yup.object({})

  const handleSubmit = useCallback(async (formData) => {
    formRef.current.setErrors({})
    try {
      await validation.validate(formData, { abortEarly: false })
      //onNewCompany({...unform,...formData})
      console.log('submitted: ', formData)
    } catch (error) {
      console.log('error',error);
    }
  }, [])
  console.log('data',data);

  return (
    <>
      { data?.atv1 &&
      <FormContainer
        style={{marginTop:20,position:'relative'}}
        noValidate
        ref={formRef}
        onSubmit={handleSubmit}
      >
      <DividerForm style={{marginTop:15}}>Localidade</DividerForm>
        <InputUnform
            width={'50%'}
            defaultValue={data?.address?.logradouro}
            name={`address.logradouro`}
            labelWidth={75}
            label={'Logradouro'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <InputUnform
            width={'15%'}
            defaultValue={data?.address?.numero}
            name={`address.numero`}
            labelWidth={63}
            label={'Número'}
            variant="outlined"
            style={{marginRight:20}}
            inputComponent={NumberFormatOnly}
            />
        <InputUnform
            width={'35%'}
            defaultValue={data?.address?.complemento}
            name={`address.complemento`}
            labelWidth={96}
            label={'Complemento'}
            icon={'Info'}
            variant="outlined"
            />
        <InputUnform
            width={'20%'}
            defaultValue={(keepOnlyNumbers(data?.address?.cep))}
            name={`address.cep`}
            labelWidth={33}
            label={'CEP'}
            variant="outlined"
            style={{marginRight:20}}
            inputComponent={NumberFormatCEP}
            />
        <InputUnform
            width={'30%'}
            defaultValue={data?.address?.bairro}
            name={`address.bairro`}
            labelWidth={50}
            label={'Bairro'}
            variant="outlined"
            style={{marginRight:20}}
            />
        <InputUnform
            width={'40%'}
            defaultValue={data?.address?.municipio}
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
            selected={estados.findIndex(i=>i===data?.address?.uf)+1}
 /*            setData={(selected)=>setdata?(data=>({...data,uf:selected}))} */
            setData={(selected)=>null}
            data={estados}
            variant="outlined"
            />
        <DividerForm >Contato Presente na Receita Federal</DividerForm>
        <InputUnform
          width={'100%'}
          defaultValue={data?.contact?.email}
          name={`contact.email`}
          labelWidth={135}
          title={'Endereço de email cadastrado na Receita Federal'}
          status={'Normal'}
          icon={'Info'}
          label={'Endereço de Email'}
          variant="outlined"
          validation={true}
        />
        <InputUnform
          width={'50%'}
          defaultValue={keepOnlyNumbers(data?.contact?.telefone)}
          name={`contact.telefone`}
          labelWidth={70}
          label={'Telefone'}
          variant="outlined"
          style={{marginRight:20}}
          inputComponent={NumberFormatTel}
        />
        <InputUnform
          width={'50%'}
          defaultValue={keepOnlyNumbers(data?.contact?.celular)}
          name={`contact.celular`}
          labelWidth={52}
          label={'Celular'}
          variant="outlined"
          inputComponent={NumberFormatCell}
        />
        <DividerForm >Contato Adicional</DividerForm>
        <InputUnform
            width={'100%'}
            name={'supervisor.name'}
            defaultValue={data?.supervisor?.name}
            title={'Nome do surpervisor das atividades, aquele que está responsavel por determinar as medidas que serão tomadas.'}
            labelWidth={150}
            label={'Nome do Supervisor'}
            status={'Normal'}
            option
            icon={'Info'}
            validation={true}
            variant="outlined"
          />
        <InputUnform
            width={'100%'}
            name={'supervisor.email'}
            defaultValue={data?.supervisor?.email}
            labelWidth={150}
            label={'Email do Supervisor'}
            option
            title={'Email do surpervisor das atividades, aquele que está responsavel por determinar as medidas que serão tomadas.'}
            status={'Normal'}
            icon={'Info'}
            validation={true}
            variant="outlined"
          />
          <InputUnform
            width={'100%'}
            defaultValue={keepOnlyNumbers(data?.supervisor?.cell)}
            name={`supervisor.cell`}
            labelWidth={70}
            label={'Telefone'}
            option
            variant="outlined"
            inputComponent={NumberFormatTel}
          />
      <ButtonForm type='submit' primary={'true'} style={{width:'fit-content',padding:'10px 25px'}}>
        SALVAR
      </ButtonForm>
    </FormContainer>
      }
      </>
  )
}
