import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { TableActionContainer, TableStatusContainer } from "./Table.elements"

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                justifyContent: 'space-between',
                display: 'flex',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            <div>
                <GridToolbarColumnsButton />
                <GridToolbarDensitySelector />
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </div>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto',
                    },
                    m: (theme) => theme.spacing(1, 0.5, 1.5),
                        '& .MuiSvgIcon-root': {
                            r: 0.5,
                        },
                        '& .MuiInput-underline:before': {
                            borderBottom: 1,
                            borderColor: 'divider',
                        },
                }}
            />
        </Box>
    );
}
  
QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
}

const Table = ({ tableRows, tableLoading, tableColumns, pageSize }) => {
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(tableRows);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = tableRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        setRows(tableRows);
    }, [tableRows]);

    return (
        <Box sx={{ height: 400, width: 1 }}>
            <DataGrid
                pageSize={ pageSize ? pageSize : 100}
                components={{ Toolbar: QuickSearchToolbar }}
                loading={ tableLoading }
                rows={rows}
                columns={tableColumns}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
            />
        </Box>
    )
}

export const TableAction = ({ children }) => {
    return (
        <TableActionContainer>
            { children }
        </TableActionContainer>
    )
}

export const TableStatus = ({ status }) => {
    var newStatus = ''
    if (status === "approved") {
        newStatus = "Disetujui"
    } else if (status === "rejected") {
        newStatus = "Ditolak"
    } else if (status === "pending") {
        newStatus = "Tertunda"
    } else if (status === "finished") {
        newStatus = "Selesai"
    }

    return (
        <TableStatusContainer status={ status }>{ newStatus }</TableStatusContainer>
    )
}

export default Table