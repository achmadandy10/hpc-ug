import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { useEffect, useState } from "react"
import { ListProposal } from "../../../Dummy"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { ButtonIconLink, ButtonIconSubmit } from "../../../components/button/Button"
import { FaCheck, FaEye, FaTimes } from "react-icons/fa"
import dateFormat from "dateformat"
import Swal from "sweetalert2"

const FacilityList = () => {
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState([])
    
    useEffect(() => {
        setRows(ListProposal.proposal)
        setLoading(false)
    }, [])

    const approvedSubmit = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menyetujui?',
            text: 'Harap periksa data baik-baik sebelum menyetujui.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setuju',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon:'success',
                    title: 'Sukses!',
                    text:'Proposal berhasil disetujui.',
                })
            }
        })
    }

    const rejectedSubmit = (id) => {
        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin menolak?',
            text: 'Harap periksa data baik-baik sebelum menyetujui.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setuju',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon:'success',
                    title: 'Sukses!',
                    text:'Proposal berhasil ditolak.',
                })
            }
        })
    }

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
                        <ButtonIconSubmit onClicked={ () => approvedSubmit(params.row.id) } color="success">
                            <FaCheck/>
                        </ButtonIconSubmit>
                        <ButtonIconSubmit onClicked={ () => rejectedSubmit(params.row.id) } color="danger">
                            <FaTimes/>
                        </ButtonIconSubmit>
                    </TableAction>
                )
            }
        },
    ]

    return (
        <PageLayout>
            <PageHeader title="Daftar Usulan"/>

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

export default FacilityList