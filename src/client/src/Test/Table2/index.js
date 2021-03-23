import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import styled from "styled-components";
import InputSearch from '../../../../components/Dashboard/Components/Standard/Search'
import TableMui from '../../../../components/Main/MuiHelpers/Table'
import {Icons} from '../../../../components/Icons/iconsDashboard'
import TableTabs from './TableComponent'
import LinearProgress from '@material-ui/core/LinearProgress';
import Tabs from '../../../../components/Main/MuiHelpers/Tabs'
import {userTypes,headCells,rows} from '../../../../constants/userTypes'

export default function EnhancedTable({setOpen}) {

    const data = {
        userTypes,
        headCells,
        rows
    }

    const [search, setSearch] = React.useState('')
    
    function onInputSearch(e) {
        setSearch(e.target.value)
    }

    function TableContainer() {
        return (
            <TableMui 
                rowPage={data.rows.length}
                pagination={false}
                rowComponent={TableTabs.TableRows}
                headComponent={TableTabs.Head}
                data={data}
            >
                
            </TableMui>
        )
    }


    return (
            <TableTabs component={TableContainer}>
                <TableTabs.FilterComponents 
                    onInputSearch={onInputSearch} 
                    search={search} 
                    setOpen={setOpen}
                    onCleanSearch={()=>setSearch('')}
                />
{/*             <LinearProgress style={{margin:10}} /> */}
            </TableTabs>
    );
}
