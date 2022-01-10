import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { FaCheck, FaCheckDouble, FaEye, FaFileInvoice, FaTimes, FaUsers } from "react-icons/fa"
import Swal from "sweetalert2"
import { ButtonIconLink, ButtonIconSubmit } from "../../../components/button/Button"
import Card, { CardInfo } from "../../../components/card/Card"
import { LoadingElement } from "../../../components/loading/Loading"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { DashboardInfoContainer } from "./Dashboard.elements"
import dateFormat from "dateformat"

const Content = () => {
    function countStatus(arr, type) {
        const countTypes = arr.filter(search => search.status === type);
        return countTypes.length;
    }

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
            </DashboardInfoContainer>
            
            <Card>
                Cooming Soon
            </Card>
        </PageLayout>
    )
}

const Proposal = () => {
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState([])
    const [user, setUser] = useState([])

    const GetDetail = () => {
        axios.get(`/api/admin-propsal/proposal-submission/show-all`).then(res => {
            if (res.data.meta.code === 200) {
                setProposal(res.data.data.submission)
            }
        })

        axios.get(`/api/admin-propsal/user/show-all`).then(res => {
            if (res.data.meta.code === 200) {
                setUser(res.data.data.user)
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        GetDetail()
    }, [])

    function countStatus(type) {
        const countTypes = proposal.filter(search => search.status === type);
        return countTypes.length;
    }

    if (loading) {
        return <LoadingElement/>
    }

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

    const columnsProposal = [
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
            <PageHeader title="Dasbor"/>

            <DashboardInfoContainer>
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Masuk"
                    count={countStatus("Approved")}
                    type="info"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Disetujui"
                    count={countStatus("Approved")}
                    type="success"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Selesai"
                    count={countStatus("Approved")}
                    type="primary"
                />
                <CardInfo
                    icon={ <FaUsers/> }
                    title="User"
                    count={user.length}
                    type="default"
                />
            </DashboardInfoContainer>
            
            <Card>
                <Table
                    tableColumns={ columnsProposal }
                    tableLoading={ loading }
                    tableRows={ proposal }
                />
            </Card>
        </PageLayout>
    )
}

const Super = () => {
    const [loading, setLoading] = useState(true)
    const [proposal, setProposal] = useState([])
    const [user, setUser] = useState([])

    const GetDetail = () => {
        axios.get(`/api/admin-super/proposal-submission/show-all`).then(res => {
            if (res.data.meta.code === 200) {
                setProposal(res.data.data.submission)
            }
        })

        axios.get(`/api/admin-super/user/show-all`).then(res => {
            if (res.data.meta.code === 200) {
                setUser(res.data.data.user)
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        GetDetail()
    }, [])

    function countStatus(type) {
        const countTypes = proposal.filter(search => search.status === type);
        return countTypes.length;
    }

    if (loading) {
        return <LoadingElement/>
    }

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

    const columnsProposal = [
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
            <PageHeader title="Dasbor"/>

            <DashboardInfoContainer>
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Masuk"
                    count={countStatus("Approved")}
                    type="info"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Disetujui"
                    count={countStatus("Approved")}
                    type="success"
                />
                <CardInfo
                    icon={ <FaFileInvoice/> }
                    title="Selesai"
                    count={countStatus("Approved")}
                    type="primary"
                />
                <CardInfo
                    icon={ <FaUsers/> }
                    title="User"
                    count={user.length}
                    type="default"
                />
            </DashboardInfoContainer>
            
            <Card>
                <Table
                    tableColumns={ columnsProposal }
                    tableLoading={ loading }
                    tableRows={ proposal }
                />
            </Card>

            <Card>
                {/* <Table
                    tableColumns={ columnsUser }
                    tableLoading={ loading }
                    tableRows={ user }
                /> */}
            </Card>
        </PageLayout>
    )
}

const Dashboard = () => {
    if (sessionStorage.getItem('role') === "Content") {
        return <Content/>
    } else if (sessionStorage.getItem('role') === "Proposal") {
        return <Proposal/>
    }  else if (sessionStorage.getItem('role') === "Super") {
        return <Super/>
    } 
}

export default Dashboard 