import React from 'react';
import TableMui from '../../../../components/Main/MuiHelpers/Table'
import TableTabs from './comp'
import {userTypes,headCells,rows} from '../../../../constants/userTypes'
import {useAuth} from '../../../../context/AuthContext'
import {onGetAllUsersCompany} from './func'
import {useNotification} from '../../../../context/NotificationContext'
import {filterObject} from '../../../../helpers/ObjectArray'
export default function EnhancedTable({currentUser,notification,setOpen,usersRows,setUsersRows}) {

    const tabsLabel = ['Sua Empresa'/* , 'Contratantes', 'Laboratório' */]

    const [search, setSearch] = React.useState('')
    const [loadContent, setLoadContent] = React.useState(true)

    const data = {
        userTypes,
        headCells,
        rows:usersRows
    }

    React.useEffect(() => {
        onGetAllUsersCompany(currentUser.company.id,setUsersRows,setLoadContent,notification)
    }, [])

    function TableContainer() {

        let filterData = {...data}

        const newData = []
        filterData.rows.map((row)=>{
          if(filterObject(row,search,'name')) newData.push({...row})
          else if (filterObject(row,search,'type')) newData.push({...row})
        })

        filterData.rows = newData

        return (
            <>
            { loadContent ?
                null
            :
                <TableMui
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
