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
            valueGetter: (params) => {
                let newStatus = ''
                if (params.row.status === "approved") {
                    newStatus = "Disetujui"
                } else if (params.row.status === "rejected") {
                    newStatus = "Ditolak"
                } else if (params.row.status === "pending") {
                    newStatus = "Tertunda"
                } else if (params.row.status === "finished") {
                    newStatus = "Selesai"
                }

                return newStatus
            },
            renderCell: (params) => {
                let newStatus = ''
                if (params.row.status === "approved") {
                    newStatus = "Disetujui"
                } else if (params.row.status === "rejected") {
                    newStatus = "Ditolak"
                } else if (params.row.status === "pending") {
                    newStatus = "Tertunda"
                } else if (params.row.status === "finished") {
                    newStatus = "Selesai"
                }

                return (
                    <>
                        <TableStatus status={ params.row.status }>
                            { newStatus }
                        </TableStatus>
                    </>
                )
            },
        },
        {
            field: 'created_at',
            headerName: 'Tanggal Pengajuan',
            width: 150,
            valueGetter: (params) => {
                const created_at = dateFormat(params.row.created_at, 'dd mmmm yyyy')
                return created_at
            },
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
            filterable: false,
            renderCell: (params) => {
                return (
                    <TableAction>
                        <ButtonIconLink to={ "/user/" + params.row.id } color="info">
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