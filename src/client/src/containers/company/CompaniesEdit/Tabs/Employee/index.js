import React, {useRef,useCallback,useEffect,useState} from 'react';
import {keepOnlyNumbers} from '../../../../../helpers/StringHandle';
import {InputEnd,InputUnform,SelectedEnd} from '../../../../../components/Main/MuiHelpers/Input'
import {NumberFormatCNPJ,NumberFormatCNAE,NumberFormatOnly,NumberFormatCEP, NumberFormatCPF,NumberFormatTel,NumberFormatCell} from '../../../../../lib/textMask'
import {
  FormContainer,
  TitleForm,DividerForm,
  AddAnotherForm,
  ButtonForm
} from '../../../../../components/Dashboard/Components/Form/comp'
import {FilterComponent,AddUserButton,NoData} from '../../../../../components/Main/Table/comp'
import {LoadingContent} from '../../../../../components/Main/Loader/LoadingContent'
import TableComponent from './table';
import Modal from './Modal';


export function Employee({employee,setEmployee,data,setData}) {
  const [loadContent, setLoadContent] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  function handleCellClick(e,rowId,row,index) {
    //history.push(`${COMPANY}/estabelecimento/${rowId}/${keepOnlyNumbers(cnpj)}/0`);
  }
  console.log('data',data)

  return (
    <>
      <FilterComponent
        setLoadContent={setLoadContent}
        setSearch={setSearch}
        search={search}
        onCleanSearch={()=>setSearch('')}
      >
        <AddUserButton onClick={()=>setOpen(true)}/>
      </FilterComponent>
      { loadContent ?
        <LoadingContent />
      : employee.length == 0 ?
          <NoData text='Nenhum empregado cadastrado até o momento' />
        :
          <TableComponent
            rowsCells={employee}
            loadContent={loadContent}
            search={search}
            handleCellClick={handleCellClick}
          />
      }
      <Modal setData={setData} setEmployee={setEmployee} data={data} companyInfo={{workplaceId:data.id,cnpj:data.cnpj,companyName:data.nome,workplaceName:data.name,companyFan:data.fantasia,companyIdent:data.identificacao}} open={open} setOpen={setOpen}/>
    </>
  )
}
