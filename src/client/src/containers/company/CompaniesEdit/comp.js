import React, {useRef,useCallback,useEffect,useState} from 'react';
import {Icons} from './../../../components/Icons/iconsDashboard.tsx';
import {
  ContainerDiv,
  ButtonContainer
} from './styles';
import {keepOnlyNumbers} from '../../../helpers/StringHandle';
import Tabs from '../../../components/Main/MuiHelpers/Tabs'
import {LoadingContent} from '../../../components/Main/Loader/LoadingContent'
import {estados} from '../../../constants/geral'
import {InputEnd,InputUnform,SelectedEnd} from '../../../components/Main/MuiHelpers/Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../lib/textMask'
import {
  HeaderForm,
  FormContainer,
  SubTitleForm,
  TitleForm,DividerForm,
  AddAnotherForm,
  ButtonForm
} from '../../../components/Dashboard/Components/Form/comp'
import { useField } from '@unform/core'
import * as Yup from 'yup'

export default function Container({children}) {
    return (
      <ContainerDiv >
        {children}
      </ContainerDiv>
    );
}

Container.TableTabs =  function TableTabs({tabsLabel,data,currentUser,notification}) {

  const [loadContent, setLoadContent] = useState(true)

/*   React.useEffect(() => {
    onGetAllCompanies(currentUser.company.id,setDataRows,setLoadContent,notification)
  }, []) */

  useEffect(() => {
    setTimeout(() => {
      setLoadContent(false)
    }, 1000);
  }, [])

  function Tab({item}) {
    console.log(item);
    if (!loadContent) {
      switch (item) {
        case 'Todas':
        return <Tab1 data={data}/>

        case 'Contratantes':
        return <Tab2/>

        default:
        return <div>134</div>
      }
    }
    return <div/>
  }

  return (
    <Tabs tabsLabel={tabsLabel} component={Tab} >
      { loadContent ?
          <LoadingContent />
        :
          null
      }
    </Tabs>
  );
}

function Tab1({data}) {

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

  return (
    <FormContainer
      style={{marginTop:20}}
      noValidate
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <InputUnform
        required
        width={'75%'}
        name="cnpj"
        labelWidth={45}
        label={'CNPJ'}
        defaultValue={keepOnlyNumbers(data?.cnpj)}
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
        data={[data?.type]}
        variant="outlined"
      />
      <ButtonForm type='submit' primary={'true'} style={{width:'fit-content',padding:'10px 25px'}}>
        SALVAR
      </ButtonForm>
    </FormContainer>
  )
}

function Tab2() {

  return (
    <div>
      Bom dia3
    </div>
  )
}


