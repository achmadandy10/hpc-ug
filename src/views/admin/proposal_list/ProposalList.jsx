import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { useEffect, useState } from "react"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { ButtonIconLink, ButtonIconSubmit } from "../../../components/button/Button"
import { FaCheck, FaCheckDouble, FaEye, FaTimes } from "react-icons/fa"
import dateFormat from "dateformat"
import Swal from "sweetalert2"
import axios from "axios"

const ProposalList = () => {
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState(null)
    
    const GetDetail = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
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

    const approvedSubmit = (id) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

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
                axios.post('/api/' + url + '/proposal-submission/approved/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil disetujui.',
                        })
                        GetDetail()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal disetujui.',
                        })
                    }
                })
            }
        })
    }

    const rejectedSubmit = (id) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

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
                axios.post('/api/' + url + '/proposal-submission/rejected/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil ditolak.',
                        })
                        GetDetail()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal ditolak.',
                        })
                    }
                })
            }
        })
    }
    
    const finishedSubmit = (id) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

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
                axios.post('/api/' + url + '/proposal-submission/finished/' + id).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil ditolak.',
                        })
                        GetDetail()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal ditolak.',
                        })
                    }
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
            width: 350,
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
            width: 150,
            disableExport: true,
            filterable: false,
            renderCell: (params) => {
                let element = ''

                if (params.row.status === "Pending") {
                    element = (
                        <>
                            <ButtonIconSubmit onClicked={ () => approvedSubmit(params.row.id) } color="success">
                                <FaCheck/>
                            </ButtonIconSubmit>
                            <ButtonIconSubmit onClicked={ () => rejectedSubmit(params.row.id) } color="danger">
                                <FaTimes/>
                            </ButtonIconSubmit>
                        </>
                    )
                } else if (params.row.status === "Approved") {
                    element = (
                        <>
                            <ButtonIconSubmit onClicked={ () => finishedSubmit(params.row.id) } color="primary">
                                <FaCheckDouble/>
                            </ButtonIconSubmit>
                        </>
                    )
                }
                return (
                    <TableAction>
                        <ButtonIconLink to={ "/admin/usulan/pratinjau/" + params.row.id } color="info">
                            <FaEye/>
                        </ButtonIconLink>
                        { element }
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

export default ProposalList