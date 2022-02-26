import { Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { TableActionContainer, TableContainer, TableStatusContainer } from "./Table.elements"

const Table = ({ tableRows, tableLoading, tableColumns, pageSize, tableId, tableInfo }) => {
    return (
        <TableContainer>
            <DataGrid
                getRowId={ tableId && (() => tableId) }
                pageSize={ pageSize ? pageSize : 100}
                loading={ tableLoading }
                rows={tableRows}
                columns={tableColumns}
                localeText={{
                    toolbarDensity: 'Size',
                    toolbarDensityLabel: 'Size',
                    toolbarDensityCompact: 'Small',
                    toolbarDensityStandard: 'Medium',
                    toolbarDensityComfortable: 'Large',
                }}
                components={{
                    Toolbar: GridToolbar,
                    NoRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                          { tableInfo ? tableInfo : "Tidak ada data"  }
                        </Stack>
                    ),
                    NoResultsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            Data tidak ditemukan
                        </Stack>
                    )
                }}
            />
        </TableContainer>
    )
}

export const TableAction = ({ children }) => {
    return (
        <TableActionContainer>
            { children }
        </TableActionContainer>
    )
}

export const TableStatus = ({ status, children }) => {
    return (
        <TableStatusContainer status={ status }>{ children }</TableStatusContainer>
    )
}

export default Table