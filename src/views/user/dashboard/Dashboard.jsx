import Card, { CardInfo } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { DashboardInfoContainer } from "./Dashboard.elements"
import { FaEye, FaFileInvoice } from "react-icons/fa"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { useEffect, useState } from "react"
import { ListProposal } from "../../../Dummy"
import dateFormat from "dateformat"
import { ButtonIconLink } from "../../../components/button/Button"
 
const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState(null)
    
    useEffect(() => {
        setRows(ListProposal.proposal)
        setLoading(false)    
    }, [])

    const columns = [
        {
            field: 'research_field',
            headerName: 'Bidang Penelitian',
            width: 200,
        },
        {
            field: 'short_description',
            headerName: 'Deskripsi Singkat Penelitian',
            width: 400,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <TableStatus status={ params.row.status }/>
                )
            },
        },
        {
            field: 'created_at',
            headerName: 'Tanggal Pengajuan',
            width: 150,
            renderCell: (params) => {
                const created_at = dateFormat(params.row.created_at, 'dd mmmm yyyy')
                return (
                    <>{ created_at }</>

                )
            },
        },
        {
            field: 'action',
            headerName: 'Aksi',
            width: 100,
            disableExport: true,
            renderCell: (params) => {
                return (
                    <TableAction>
                        <ButtonIconLink>
                            <FaEye/>
                        </ButtonIconLink>
                    </TableAction>
                )
            }
        },
    ]

    return (
        <PageLayout>
            <PageHeader title="Dasbor"/>

            <DashboardInfoContainer>
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Disetujui"
                    count={1}
                    type="success"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Tertunda"
                    count={1}
                    type="warning"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Ditolak"
                    count={1}
                    type="danger"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Selesai"
                    count={1}
                    type="primary"
                />
            </DashboardInfoContainer>

            <Card>
                <Table
                    tableColumns={ columns }
                    tableLoading={ loading }
                    tableRows={ rows }
                />
            </Card>
        </PageLayout>
    )
}

export default Dashboard