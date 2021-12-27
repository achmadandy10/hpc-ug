import Card, { CardInfo } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { DashboardInfoContainer } from "./Dashboard.elements"
import { FaEye, FaFileInvoice, FaEdit, FaTrash } from "react-icons/fa"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { useEffect, useState } from "react"
import dateFormat from "dateformat"
import { ButtonIconLink, ButtonIconSubmit } from "../../../components/button/Button"
import axios from "axios"
import Swal from "sweetalert2"

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState([])
    
    const GetDetail = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Internal") {
            url = 'user-internal'
        } else if (sessionStorage.getItem('role') === "External") {
            url = 'user-external'
        }
        
        axios.get('/api/' + url + '/proposal-submission/show-all').then(res => {
            if (res.data.meta.code === 200) {
                setRows(res.data.data.submission)
            }
            setLoading(false)    
        })
    }

    useEffect(() => {
        GetDetail()
    }, [])

    function countStatus(type) {
        const countTypes = rows.filter(search => search.status === type);
        return countTypes.length;
    }

    const deleteSubmit = (id, status) => {
        if (status === "Approved" || status === "Finished") {
            Swal.fire({
                icon:'danger',
                title: 'Gagal!',
                text:'Usulan gagal dihapus.',
            })
        } else {
            var url = ''
            if (sessionStorage.getItem('role') === "Internal") {
                url = 'user-internal'
            } else if (sessionStorage.getItem('role') === "External") {
                url = 'user-external'
            }

            Swal.fire({
                icon: 'question',
                title: 'Benar ingin menghapus usulan?',
                text: 'Pilih "Hapus" jika Anda benar ingin menghapus usulan.',
                showCancelButton: true,
                confirmButtonColor: "#5B3A89",
                cancelButtonColor: "#F34636",
                cancelButtonText: 'Batal',
                confirmButtonText: 'Hapus',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post('/api/' + url + '/proposal-submission/delete/' + id).then(res => {
                        if (res.data.meta.code === 200) {
                            Swal.fire({
                                icon:'success',
                                title: 'Sukses!',
                                text:'Usulan berhasil dihapus.',
                            })
                            GetDetail()
                        } else {
                            Swal.fire({
                                icon: "danger",
                                title: "Gagal!",
                                text: "Usulan gagal dihapus."
                            })
                        }
                    })
                }
            })
        }
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
                if (params.row.status === "Approved") {
                    newStatus = "Disetujui"
                } else if (params.row.status === "Rejected") {
                    newStatus = "Ditolak"
                } else if (params.row.status === "Pending") {
                    newStatus = "Tertunda"
                } else if (params.row.status === "Finished") {
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
                let element = ''

                if (params.row.status === "Pending" || params.row.status === "Rejected") {
                    element = (
                        <>
                            <ButtonIconLink to={ "/user/usulan/ubah/" + params.row.id } color="info">
                                <FaEdit/>
                            </ButtonIconLink>
                            <ButtonIconSubmit color="danger" onClicked={ () => deleteSubmit(params.row.id, params.row.status) }>
                                <FaTrash/>
                            </ButtonIconSubmit>
                        </>
                    )    
                } else {
                    element = (
                        <ButtonIconLink to={ "/user/usulan/pratinjau/" + params.row.id } color="info">
                            <FaEye/>
                        </ButtonIconLink>
                    )
                }

                return (
                    <TableAction>
                        { element }
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
                    count={countStatus("Approved")}
                    type="success"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Tertunda"
                    count={countStatus("Pending")}
                    type="warning"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Ditolak"
                    count={countStatus("Rejected")}
                    type="danger"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Selesai"
                    count={countStatus("Finished")}
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