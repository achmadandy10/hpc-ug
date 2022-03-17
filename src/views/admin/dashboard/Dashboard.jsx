import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { FaCheck, FaCheckDouble, FaEye, FaFileInvoice, FaTimes, FaUsers } from "react-icons/fa"
import Swal from "sweetalert2"
import { ButtonIconLink, ButtonIconSubmit, ButtonSubmit } from "../../../components/button/Button"
import Card, { CardHeader, CardInfo } from "../../../components/card/Card"
import { LoadingElement } from "../../../components/loading/Loading"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { DashboardInfoContainer } from "./Dashboard.elements"
import dateFormat from "dateformat"
import Popup from "../../../components/popup/Popup"
import { InputField, TextEditor } from "../../../components/text_field/TextField"

const Content = () => {
    const [get, setGet] = useState(true)
    const [content, setContent] = useState([])

    useEffect(() => {
        const GetData = () => {
            var url = ''
            if (localStorage.getItem('role') === "Content") {
                url = 'admin-content'
            } else if (localStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }

            axios.get(`/api/${url}/post/show-all`).then(res => {
                if (res.data.meta.code === 200) {
                    setContent(res.data.data.post)
                    setGet(false)
                }
            })
        }

        GetData()
    }, [])
    
    const post = [
        {
            field: 'title',
            headerName: 'Judul',
            width: 200,
            renderCell: (params) => {

                return (
                    <>
                        { params.row.title === null ? "(Tidak ada)" : params.row.title }
                    </>
                )
            },
        },
        {
            field: 'slug',
            headerName: 'Slug',
            width: 200,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                let newStatus = ''
                if (params.row.status === "Post") {
                    newStatus = "Post"
                } else if (params.row.status === "Draft") {
                    newStatus = "Draft"
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
    ]

    return (
        <PageLayout>
            <PageHeader title="Dasbor"/>

            <Card>
                <CardHeader title="Daftar Konten"/>
                <Table
                    tableColumns={ post }
                    tableLoading={ get }
                    tableRows={ content }
                />
            </Card>
        </PageLayout>
    )
}

const Proposal = () => {
    const [loading, setLoading] = useState(true)
    const [days, setDays] = useState([])
    const [machine, setMachine] = useState([])
    const [loadingApproved, setLoadingApproved] = useState(false)
    const [loadingRejected, setLoadingRejected] = useState(false)
    const [popupApproved, setPopupApproved] = useState(false)
    const [popupRejected, setPopupRejected] = useState(false)
    const [formApproved, setFormApproved] = useState({
        id_proposal: '',
        docker_image: '',
        username: '',
        id_hari: '',
        durasi: '',
        id_mesin: '',
        appr_description: '',
        error_list: '',
    })
    const [formRejected, setFormRejected] = useState({
        id_proposal: '',
        rev_description: '',
        error_list: [],
    })
    const [proposal, setProposal] = useState([])
    const [user, setUser] = useState([])
    
    const inputApprovedChange = (name, value) => {
        setFormApproved({ ...formApproved, [name]: value })
    }

    const inputRejectedChange = (name, value) => {
        setFormRejected({ ...formRejected, [name]: value })
    }

    const GetDetail = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(`${process.env.REACT_APP_API_URL_2}/hari`, requestOptions)
        .then(response => response.json())
        .then(result => {
            result.data.map(v => {
                const data = {
                    label: v.nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                        return letter.toUpperCase()
                    }),
                    value: v.id,
                }

                return setDays(days => [...days, data])
            })
        })
        .catch(error => console.log('error', error));
          
        fetch(`${process.env.REACT_APP_API_URL_2}/mesin`, requestOptions)
        .then(response => response.json())
        .then(result => {
            result.data.map(v => {
                const data = {
                    label: v.nama_mesin,
                    value: v.id_mesin,
                }

                return setMachine(machine => [...machine, data])
            })
        })
        .catch(error => console.log('error', error));

        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get(`/api/${url}/proposal-submission/show-all`).then(res => {
            if (res.data.meta.code === 200) {
                setProposal(res.data.data.submission)
            }
        })

        axios.get(`/api/${url}/user/show-all-user`).then(res => {
            if (res.data.meta.code === 200) {
                setUser(res.data.data.user)
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        GetDetail()
    }, [])

    const handleApproved = (id) => {
        setFormApproved({ 
            ...formApproved, 
            id_proposal: id,
            username: proposal.filter(v => v.id === id)[0].user.email.split("@")[0],
            docker_image: proposal.filter(v => v.id === id)[0].docker_image
        })
        setPopupApproved(!popupApproved)
    }

    const handleRejected = (id) => {
        setFormRejected({ 
            ...formRejected, 
            id_proposal: id,
        })
        setPopupRejected(!popupRejected)
    }

    function countStatus(type) {
        const countTypes = proposal.filter(search => search.status === type);
        return countTypes.length;
    }

    if (loading) {
        return <LoadingElement/>
    }

    const approvedSubmit = (id) => {
        setLoadingApproved(false)

        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
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
                var formdata = new FormData();

                formdata.append("DockerImages", formApproved.docker_image);
                formdata.append("username", formApproved.username);
                formdata.append("id_hari", formApproved.id_hari);
                formdata.append("durasi", formApproved.durasi);
                formdata.append("id_mesin", formApproved.id_mesin);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                if (formApproved.appr_description === null) {
                    Swal.fire({
                        icon:'warning',
                        text:'harap lengkapi form.',
                    })

                    return false;
                }

                fetch(`${process.env.REACT_APP_API_URL_2}/approval`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.json();
                })
                .then(result => {
                    if (result.error === true) {
                        Swal.fire({
                            icon:'warning',
                            title: result.message,
                        })
                    } else {
                        var formdata = new FormData();
    
                        formdata.append("appr_description", formApproved.appr_description);

                        axios.post('/api/' + url + '/proposal-submission/approved/' + id, formdata).then(res => {
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
                                setFormApproved({ ...formApproved, error_list: res.data.data.validation_errors })
                            }
                        })
                    }
                })
                .catch(error => {
                    if (error.status === 422) {
                        Swal.fire({
                            icon:'warning',
                            title: error.statusText,
                            text:'harap lengkapi form.',
                        })
                    }
                    return false
                });
            }
        })
    }

    const rejectedSubmit = (id) => {
        setLoadingRejected(true)
        
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin merevisi?',
            text: 'Harap periksa data baik-baik sebelum revisi.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setuju',
        }).then((result) => {
            if (result.isConfirmed) {
                var formdata = new FormData();

                formdata.append("rev_description", formRejected.rev_description);

                axios.post('/api/' + url + '/proposal-submission/rejected/' + id, formdata).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil Revisi.',
                        })
                        GetDetail()
                    } else {
                        setFormRejected({ ...formRejected, error_list: res.data.data.validation_errors })
                    }
                    setLoadingRejected(false)
                })
            } else {
                setLoadingRejected(false)
            }
        })
    }
    
    const finishedSubmit = (id) => {
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin merevisi?',
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
                            text:'Proposal berhasil Revisi.',
                        })
                        GetDetail()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal Revisi.',
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
                    newStatus = "Revisi"
                } else if (params.row.status === "pending") {
                    newStatus = "Belum Disetujui"
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
                    newStatus = "Revisi"
                } else if (params.row.status === "Pending") {
                    newStatus = "Belum Disetujui"
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
                            <ButtonIconSubmit onClicked={ () => handleApproved(params.row.id) } color="success">
                                <FaCheck/>
                            </ButtonIconSubmit>
                            <Popup
                                trigger={ popupApproved } 
                                setTrigger={ setPopupApproved }
                                title="Tambah Mesin"
                            >
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <InputField
                                        label="Docker Image"
                                        id="docker_image"
                                        name="docker_image"
                                        value={ formApproved.docker_image }
                                        onChanged={ inputApprovedChange }
                                        type="text"
                                        readOnly
                                    />
                                    <InputField
                                        label="Username"
                                        id="username"
                                        name="username"
                                        value={ formApproved.username }
                                        onChanged={ inputApprovedChange }
                                        type="text"
                                        readOnly
                                    />
                                    <InputField
                                        label="Hari"
                                        id="id_hari"
                                        name="id_hari"
                                        value={formApproved.id_hari}
                                        onChanged={inputApprovedChange}
                                        type="select"
                                        option={days}
                                        placeholder={"Pilih Hari"}
                                        isLoading={loading}
                                    />
                                    <InputField
                                        label="Durasi"
                                        id="durasi"
                                        name="durasi"
                                        value={ formApproved.durasi }
                                        onChanged={ inputApprovedChange }
                                        type="number"
                                    />
                                    <InputField
                                        label="Mesin"
                                        id="id_mesin"
                                        name="id_mesin"
                                        value={formApproved.id_mesin}
                                        onChanged={inputApprovedChange}
                                        type="select"
                                        option={machine}
                                        placeholder={"Pilih Mesin"}
                                        isLoading={loading}
                                    />
                                    <TextEditor
                                        label="Detail Setujui"
                                        name="appr_description"
                                        onChanged={ inputApprovedChange }
                                        error={ formApproved.error_list.appr_description }
                                    />
                                    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                                        <ButtonSubmit color="primary" loading={ loadingApproved } onClicked={ () => approvedSubmit(formApproved.id_proposal) }>
                                            Tambah
                                        </ButtonSubmit>
                                    </div>
                                </div>
                            </Popup>
                            <ButtonIconSubmit onClicked={ () => handleRejected(params.row.id) } color="danger">
                                <FaTimes/>
                            </ButtonIconSubmit>
                            <Popup
                                trigger={ popupRejected } 
                                setTrigger={ setPopupRejected }
                                title="Detail Revisi"
                            >
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <TextEditor
                                        name="rev_description"
                                        onChanged={ inputRejectedChange }
                                        error={ formRejected.error_list.rev_description }
                                    />
                                    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                                        <ButtonSubmit color="primary" loading={ loadingRejected } onClicked={ () => rejectedSubmit(formRejected.id_proposal) }>
                                            Revisi
                                        </ButtonSubmit>
                                    </div>
                                </div>
                            </Popup>
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
    const [days, setDays] = useState([])
    const [machine, setMachine] = useState([])
    const [loadingApproved, setLoadingApproved] = useState(false)
    const [loadingRejected, setLoadingRejected] = useState(false)
    const [popupApproved, setPopupApproved] = useState(false)
    const [popupRejected, setPopupRejected] = useState(false)
    const [formApproved, setFormApproved] = useState({
        id_proposal: '',
        docker_image: '',
        username: '',
        id_hari: '',
        durasi: '',
        id_mesin: '',
        appr_description: '',
        error_list: '',
    })
    const [formRejected, setFormRejected] = useState({
        id_proposal: '',
        rev_description: '',
        error_list: [],
    })
    const [proposal, setProposal] = useState([])
    const [user, setUser] = useState([])
    
    const inputApprovedChange = (name, value) => {
        setFormApproved({ ...formApproved, [name]: value })
    }

    const inputRejectedChange = (name, value) => {
        setFormRejected({ ...formRejected, [name]: value })
    }

    const GetDetail = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(`${process.env.REACT_APP_API_URL_2}/hari`, requestOptions)
        .then(response => response.json())
        .then(result => {
            result.data.map(v => {
                const data = {
                    label: v.nama.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                        return letter.toUpperCase()
                    }),
                    value: v.id,
                }

                return setDays(days => [...days, data])
            })
        })
        .catch(error => console.log('error', error));
          
        fetch(`${process.env.REACT_APP_API_URL_2}/mesin`, requestOptions)
        .then(response => response.json())
        .then(result => {
            result.data.map(v => {
                const data = {
                    label: v.nama_mesin,
                    value: v.id_mesin,
                }

                return setMachine(machine => [...machine, data])
            })
        })
        .catch(error => console.log('error', error));

        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get(`/api/${url}/proposal-submission/show-all`).then(res => {
            if (res.data.meta.code === 200) {
                setProposal(res.data.data.submission)
            }
        })

        axios.get(`/api/${url}/user/show-all-user`).then(res => {
            if (res.data.meta.code === 200) {
                setUser(res.data.data.user)
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        GetDetail()
    }, [])

    const handleApproved = (id) => {
        setFormApproved({ 
            ...formApproved, 
            id_proposal: id,
            username: proposal.filter(v => v.id === id)[0].user.email.split("@")[0],
            docker_image: proposal.filter(v => v.id === id)[0].docker_image
        })
        setPopupApproved(!popupApproved)
    }

    const handleRejected = (id) => {
        setFormRejected({ 
            ...formRejected, 
            id_proposal: id,
        })
        setPopupRejected(!popupRejected)
    }

    function countStatus(type) {
        const countTypes = proposal.filter(search => search.status === type);
        return countTypes.length;
    }

    if (loading) {
        return <LoadingElement/>
    }

    const approvedSubmit = (id) => {
        setLoadingApproved(false)

        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
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
                var formdata = new FormData();

                formdata.append("DockerImages", formApproved.docker_image);
                formdata.append("username", formApproved.username);
                formdata.append("id_hari", formApproved.id_hari);
                formdata.append("durasi", formApproved.durasi);
                formdata.append("id_mesin", formApproved.id_mesin);

                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                if (formApproved.appr_description === null) {
                    Swal.fire({
                        icon:'warning',
                        text:'harap lengkapi form.',
                    })

                    return false;
                }

                fetch(`${process.env.REACT_APP_API_URL_2}/approval`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.json();
                })
                .then(result => {
                    if (result.error === true) {
                        Swal.fire({
                            icon:'warning',
                            title: result.message,
                        })
                    } else {
                        var formdata = new FormData();
    
                        formdata.append("appr_description", formApproved.appr_description);

                        axios.post('/api/' + url + '/proposal-submission/approved/' + id, formdata).then(res => {
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
                                setFormApproved({ ...formApproved, error_list: res.data.data.validation_errors })
                            }
                        })
                    }
                })
                .catch(error => {
                    if (error.status === 422) {
                        Swal.fire({
                            icon:'warning',
                            title: error.statusText,
                            text:'harap lengkapi form.',
                        })
                    }
                    return false
                });
            }
        })
    }

    const rejectedSubmit = (id) => {
        setLoadingRejected(true)
        
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin merevisi?',
            text: 'Harap periksa data baik-baik sebelum revisi.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Setuju',
        }).then((result) => {
            if (result.isConfirmed) {
                var formdata = new FormData();

                formdata.append("rev_description", formRejected.rev_description);

                axios.post('/api/' + url + '/proposal-submission/rejected/' + id, formdata).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Proposal berhasil Revisi.',
                        })
                        GetDetail()
                    } else {
                        setFormRejected({ ...formRejected, error_list: res.data.data.validation_errors })
                    }
                    setLoadingRejected(false)
                })
            } else {
                setLoadingRejected(false)
            }
        })
    }
    
    const finishedSubmit = (id) => {
        var url = ''
        if (localStorage.getItem('role') === "Proposal") {
            url = 'admin-proposal'
        } else if (localStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Yakin ingin merevisi?',
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
                            text:'Proposal berhasil Revisi.',
                        })
                        GetDetail()
                    } else {
                        Swal.fire({
                            icon:'danger',
                            title: 'Gagal!',
                            text:'Proposal gagal Revisi.',
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
                    newStatus = "Revisi"
                } else if (params.row.status === "pending") {
                    newStatus = "Belum Disetujui"
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
                    newStatus = "Revisi"
                } else if (params.row.status === "Pending") {
                    newStatus = "Belum Disetujui"
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
                            <ButtonIconSubmit onClicked={ () => handleApproved(params.row.id) } color="success">
                                <FaCheck/>
                            </ButtonIconSubmit>
                            <Popup
                                trigger={ popupApproved } 
                                setTrigger={ setPopupApproved }
                                title="Tambah Mesin"
                            >
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <InputField
                                        label="Docker Image"
                                        id="docker_image"
                                        name="docker_image"
                                        value={ formApproved.docker_image }
                                        onChanged={ inputApprovedChange }
                                        type="text"
                                        readOnly
                                    />
                                    <InputField
                                        label="Username"
                                        id="username"
                                        name="username"
                                        value={ formApproved.username }
                                        onChanged={ inputApprovedChange }
                                        type="text"
                                        readOnly
                                    />
                                    <InputField
                                        label="Hari"
                                        id="id_hari"
                                        name="id_hari"
                                        value={formApproved.id_hari}
                                        onChanged={inputApprovedChange}
                                        type="select"
                                        option={days}
                                        placeholder={"Pilih Hari"}
                                        isLoading={loading}
                                    />
                                    <InputField
                                        label="Durasi"
                                        id="durasi"
                                        name="durasi"
                                        value={ formApproved.durasi }
                                        onChanged={ inputApprovedChange }
                                        type="number"
                                    />
                                    <InputField
                                        label="Mesin"
                                        id="id_mesin"
                                        name="id_mesin"
                                        value={formApproved.id_mesin}
                                        onChanged={inputApprovedChange}
                                        type="select"
                                        option={machine}
                                        placeholder={"Pilih Mesin"}
                                        isLoading={loading}
                                    />
                                    <TextEditor
                                        label="Detail Setujui"
                                        name="appr_description"
                                        onChanged={ inputApprovedChange }
                                        error={ formApproved.error_list.appr_description }
                                    />
                                    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                                        <ButtonSubmit color="primary" loading={ loadingApproved } onClicked={ () => approvedSubmit(formApproved.id_proposal) }>
                                            Tambah
                                        </ButtonSubmit>
                                    </div>
                                </div>
                            </Popup>
                            <ButtonIconSubmit onClicked={ () => handleRejected(params.row.id) } color="danger">
                                <FaTimes/>
                            </ButtonIconSubmit>
                            <Popup
                                trigger={ popupRejected } 
                                setTrigger={ setPopupRejected }
                                title="Detail Revisi"
                            >
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <TextEditor
                                        name="rev_description"
                                        onChanged={ inputRejectedChange }
                                        error={ formRejected.error_list.rev_description }
                                    />
                                    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                                        <ButtonSubmit color="primary" loading={ loadingRejected } onClicked={ () => rejectedSubmit(formRejected.id_proposal) }>
                                            Revisi
                                        </ButtonSubmit>
                                    </div>
                                </div>
                            </Popup>
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

const Dashboard = () => {
    if (localStorage.getItem('role') === "Content") {
        return <Content/>
    } else if (localStorage.getItem('role') === "Proposal") {
        return <Proposal/>
    }  else if (localStorage.getItem('role') === "Super") {
        return <Super/>
    } 
}

export default Dashboard 