import React from 'react';
import TableMui from '../../../../components/Main/MuiHelpers/Table'
import TableTabs from './comp'
import {onGetAllCompanies} from './func'
import {filterObject} from '../../../../helpers/ObjectArray'

const headCells = [
    { id: 'CNPJ', disablePadding: true, label: 'CNPJ' },
    { id: 'name', disablePadding: false, label: 'Identificação' },
    { id: 'responsavel', disablePadding: false, label: 'Responsável Legal' },
    { id: 'creation', disablePadding: false, label: 'Início/Fim' },
    { id: 'status', align:true, disablePadding: false, label: 'Status' },
  ];

export default function EnhancedTable({currentUser,notification,setOpen,dataRows,setDataRows}) {

    const tabsLabel = ['Todas'/* , 'Contratantes', 'Laboratório' */]

    const [search, setSearch] = React.useState('')
    const [loadContent, setLoadContent] = React.useState(true)
    
    const data = {
        headCells:headCells,
        rows:dataRows
    }
    
    React.useEffect(() => {
        onGetAllCompanies(currentUser.company.id,setDataRows,setLoadContent,notification)
    }, [])

    function TableContainer() {

        let filterData = {...data}

        const newData = []
        filterData.rows.map((row)=>{
          if(filterObject(row,search,'CNPJ')) newData.push({...row})
          else if (filterObject(row,search,'name')) newData.push({...row})
          else if (filterObject(row,search,'responsavel')) newData.push({...row})
          else if (filterObject(row,search,'status')) newData.push({...row})
        })

        filterData.rows = newData
 
        return (
            <>
            { loadContent ?
                null
            :
                <TableMui 
                    select
                    rowPage={data.rows.length}
                    pagination={false}
                    rowComponent={TableTabs.TableRows}
                    headComponent={TableTabs.Head}
                    data={filterData}
                />
            }
            </>
        )
    }


    return (
            <TableTabs tabsLabel={tabsLabel} component={TableContainer}>
                <TableTabs.FilterComponents 
                    setLoadContent={setLoadContent}
                    setSearch={setSearch} 
                    search={search} 
                    setOpen={setOpen}
                    onCleanSearch={()=>setSearch('')}
                />
                { loadContent ?
                    <TableTabs.LoadingContent />
                :
                    null
                }
            </TableTabs>
    );
}
