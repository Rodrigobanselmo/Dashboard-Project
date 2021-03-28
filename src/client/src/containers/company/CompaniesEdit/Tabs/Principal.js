import React, {useRef,useCallback,useEffect,useState} from 'react';
import {keepOnlyNumbers} from '../../../../helpers/StringHandle';
import {InputEnd,InputUnform,SelectedEnd} from '../../../../components/Main/MuiHelpers/Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../lib/textMask'
import {
  FormContainer,
  TitleForm,DividerForm,
  AddAnotherForm,
  ButtonForm
} from '../../../../components/Dashboard/Components/Form/comp'
import { useField } from '@unform/core'
import * as Yup from 'yup'


export function Principal({data,setData}) {

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

  const selectorType = [`MATRIZ`,`FILIAL`,`GRUPO EMPRESARIAL`]

  return (
    <>
      { data?.atv1 &&
      <FormContainer
        style={{marginTop:20,position:'relative'}}
        noValidate
        ref={formRef}
        onSubmit={handleSubmit}
      >
      <DividerForm style={{marginTop:15}}>Dados Essenciais</DividerForm>
      <InputUnform
        required
        width={'75%'}
        name="cnpj"
        labelWidth={45}
        label={'CNPJ'}
        defaultValue={keepOnlyNumbers(data?.cnpj ?? data?.CNPJ)}
        disabled={true}
        variant="outlined"
        style={{marginRight:20}}
        inputComponent={NumberFormatCNPJ}
      />
      <SelectedEnd
        width={'25%'}
        label={'Tipo'}
        labelWidth={36}
        selected={1}
        value={1}
        setData={(selected)=>null}
        data={[data?.type,...selectorType.filter(i=>i !== data?.type)]}
        variant="outlined"
      />
      { data?.type.toLowerCase() === 'filial' &&
        <InputUnform
        required
        width={'100%'}
        name="cnpj"
        labelWidth={120}
        label={'CNPJ Da Matriz'}
        defaultValue={keepOnlyNumbers(data?.cnpjMatriz)}
        variant="outlined"
        style={{marginRight:0}}
        inputComponent={NumberFormatCNPJ}
        />
      }
      <DividerForm >Identificação</DividerForm>
      <InputUnform
        width={'100%'}
        defaultValue={data?.responsavel}
        name={'responsavel'}
        title={'O Representante Legal é pessoa que possui o nome no contrato social da empresa, seja como dono, sócio ou sócio administrativo. É, portanto, quem representa a empresa diante da Receita Federal e sociedade.'}
        labelWidth={310}
        label={'Responsavel Legal'}
        status={'Normal'}
        icon={'Info'}
        validation={true}
        variant="outlined"
        inputProps={{style: {textTransform: 'capitalize'}}}
        option={'OBRIGATÓRIO EM DOCUMENTOS'}
      />
      <InputUnform
          required
          width={'100%'}
          name="nome"
          defaultValue={data?.nome}
          labelWidth={100}
          label={'Razão Social'}
          title={'Nome da Empresa'}
          status={'Normal'}
          icon={'Info'}
          variant="outlined"
          />
      <InputUnform
          width={'100%'}
          defaultValue={data?.fantasia}
          name="fantasia"
          labelWidth={73}
          label={'Fantasia'}
          status={'Normal'}
          variant="outlined"
      />
      <InputUnform
            width={'100%'}
            name={'identificacao'}
            defaultValue={data?.identificacao}
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
      <DividerForm >Área de Atuação Principal</DividerForm>
      <InputUnform
            width={'70%'}
            name="atv1[0].text"
            defaultValue={data?.atv1[0]?.text}
            labelWidth={125}
            label={'Atuação Prinpical'}
            status={'Normal'}
            icon={'Info'}
            variant="outlined"
            style={{marginRight:20}}
        />
        <InputUnform
            width={'30%'}
            defaultValue={(keepOnlyNumbers(data?.atv1[0]?.code))}
            name="atv1[0].code"
            labelWidth={40}
            label={'CNAE'}
            status={'Normal'}
            icon={'Info'}
            variant="outlined"
            inputComponent={NumberFormatCNAE}
        />
        <DividerForm >Áreas de Atuação Secundária</DividerForm>
        {data?.atv2.map((item,index)=>(
          <div style={{width:'100%'}} key={index}>
            <InputUnform
                width={'70%'}
                defaultValue={data?.atv2[index]?.text}
                name={`atv2[${index}].text`}
                labelWidth={125}
                label={'Atuação Prinpical'}
                status={'Normal'}
                icon={'Info'}
                variant="outlined"
                style={{marginRight:20}}
            />
            <InputUnform
                width={'30%'}
                name={`atv2[${index}].code`}
                defaultValue={(keepOnlyNumbers(data?.atv2[index]?.code))}
                labelWidth={40}
                label={'CNAE'}
                status={'Normal'}
                icon={'Info'}
                variant="outlined"
                inputComponent={NumberFormatCNAE}
            />
          </div>
        ))}
        {/* <AddAnotherForm onClick={()=>setReceitaFederal(data=>({...data,atividades_secundarias:[...data.atividades_secundarias,{text:'',code:''}]}))}>Adicionar Outra</AddAnotherForm> */}
      <ButtonForm type='submit' primary={'true'} style={{width:'fit-content',padding:'10px 25px'}}>
        SALVAR
      </ButtonForm>
    </FormContainer>
      }
      </>
  )
}
