import React from 'react';
import TableMui from '../MuiHelpers/Table'
import TableTabs from './comp'
import {filterObject} from '../../../helpers/ObjectArray'

export default function EnhancedTable({loadContent,setLoadContent,orderCells,dataRows,tabsLabel,headCells,serachParams,children}) {

    const [search, setSearch] = React.useState('')
    const [selected, setSelected] = React.useState([]);

    const data = {
        headCells:headCells,
        rows:dataRows,
        orderCells:orderCells
    }

    function TableContainer() {

        let filterData = {...data}

        const newData = []
        filterData.rows.map((row)=>{
          if(serachParams[0] && filterObject(row,search,serachParams[0])) newData.push({...row})
          else if (serachParams[1] && filterObject(row,search,serachParams[1])) newData.push({...row})
          else if (serachParams[2] && filterObject(row,search,serachParams[2])) newData.push({...row})
          else if (serachParams[3] && filterObject(row,search,serachParams[3])) newData.push({...row})
          else if (serachParams[4] && filterObject(row,search,serachParams[4])) newData.push({...row})
          else if (serachParams[5] && filterObject(row,search,serachParams[5])) newData.push({...row})
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
                    onCleanSearch={()=>setSearch('')}
                    >
                  {children}
                </TableTabs.FilterComponents>
                { loadContent ?
                    <TableTabs.LoadingContent />
                    :
                    null
                  }
          </TableTabs>
    );
}
