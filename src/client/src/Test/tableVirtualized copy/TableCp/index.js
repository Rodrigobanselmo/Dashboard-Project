import React from 'react';
import TableMui from '../TableComp'
import TableTabs from './comp'
import {filterObject} from '../../../helpers/ObjectArray'

export default function EnhancedTable({
  loadContent,
  orderCells,
  dataRows,
  search,
  headCells,
  searchParams,
  selected,
  setSelected,
  handleCellClick,
  styleCell,
  children
}) {

    const data = {
        headCells:headCells,
        rows:dataRows,
        orderCells:orderCells
    }

      let filterData = {...data}

      const newData = []
      filterData.rows.map((row)=>{
        if(searchParams[0] && filterObject(row,search,searchParams[0])) newData.push({...row})
        else if (searchParams[1] && filterObject(row,search,searchParams[1])) newData.push({...row})
        else if (searchParams[2] && filterObject(row,search,searchParams[2])) newData.push({...row})
        else if (searchParams[3] && filterObject(row,search,searchParams[3])) newData.push({...row})
        else if (searchParams[4] && filterObject(row,search,searchParams[4])) newData.push({...row})
        else if (searchParams[5] && filterObject(row,search,searchParams[5])) newData.push({...row})
      })
      //console.log(item);
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
                  selected={selected}
                  setSelected={setSelected}
                  handleCellClick={handleCellClick}
                  styleCell={styleCell}
              />
          }
          </>
      )
  }
