import Card, { CardHeader } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { FaEye, FaPenSquare } from "react-icons/fa"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { useEffect, useState } from "react"
import dateFormat from "dateformat"
import { ButtonIconLink } from "../../../components/button/Button"
import axios from "axios"
import Swal from "sweetalert2"
import { InputField } from "../../../components/text_field/TextField"
import { ButtonSubmit } from "../../../components/button/Button"

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState(false)
    const [rows, setRows] = useState({
        proposal: [],
        mesin: [],
    })
    const [days, setDays] = useState([])
    const [machine, setMachine] = useState([])
    const [form, setForm] = useState({
        id_hari: '',
        id_mesin: ''
    })
    const [info, setInfo] = useState(null)
    
    const inputChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const GetProposal = () => {
        var url = ''
        if (localStorage.getItem('role') === "Internal") {
            url = 'user-internal'
        } else if (localStorage.getItem('role') === "External") {
            url = 'user-external'
        }
        
        axios.get('/api/' + url + '/proposal-submission/show-all').then(res => {
            if (res.data.meta.code === 200) {
                setRows({
                    proposal: res.data.data.submission,
                    mesin: []
                })
            }
            setLoading(false)    
        })
    }

    const handleFind = () => {
        if (form.id_hari === '' && form.id_mesin === '') {
            Swal.fire({
                icon: "warning",
                title: "Peringatan!",
                text: "Silahkan pilih hari dan mesin terlebih dahulu."
            })
            
            return false
        } else if (form.id_hari === '') {
            Swal.fire({
                icon: "warning",
                title: "Peringatan!",
                text: "Silahkan pilih hari terlebih dahulu."
            })
            
            return false
        } else if (form.id_mesin === '') {
            Swal.fire({
                icon: "warning",
                title: "Peringatan!",
                text: "Silahkan pilih mesiin terlebih dahulu."
            })
            
            return false
        }

        setStore(true)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(`${process.env.REACT_APP_API_URL_2}/run/${form.id_hari}/${form.id_mesin}/all/${localStorage.username}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.data.length === 0) {
                setInfo("Data tidak ditemukan")
                setStore(false)
                
                return false
            }
            setRows(result.data)
            setStore(false)
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        const GetData = () => {
            setInfo("Silahkan pilih hari dan mesin")

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
        }

        GetProposal()
        GetData()
    }, [])

    const columnProposal = [
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
            width: 100,
            disableExport: true,
            filterable: false,
            renderCell: (params) => {
                let button = ''
                
                if (params.row.status === "Rejected") {
                    button = 
                        <TableAction>
                            <ButtonIconLink to={ "/user/usulan/ubah/" + params.row.id } color="info">
                                <FaPenSquare/>
                            </ButtonIconLink>
                        </TableAction>
                    
                    
                } else {
                    button = 
                        <TableAction>
                            <ButtonIconLink to={ "/user/usulan/pratinjau/" + params.row.id } color="info">
                                <FaEye/>
                            </ButtonIconLink>
                        </TableAction>
                }
                return (
                    <>
                        { button }
                    </>
                )
            }
        },
    ]

    const columnMesin = [
        {
            field: 'id_container',
            headerName: 'ID Container',
            width: 200,
        },
        {
            field: 'url_jupyter',
            headerName: 'URL Jupyter',
            width: 400,
        },
        {
            field: 'token',
            headerName: 'Token',
            width: 250,
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
                } else {
                    newStatus = params.row.status
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
                } else {
                    newStatus = params.row.status
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
    ]

    return (
        <PageLayout>
            <PageHeader title="Dasbor"/>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <Card>                   
                    <CardHeader title="Daftar Pengajuan Proposal"/> 
                    <Table
                        tableColumns={ columnProposal }
                        tableLoading={ loading }
                        tableRows={ rows.proposal }
                    />
                </Card>

                <Card>
                    <CardHeader title="Daftar Mesin"/> 
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            marginBottom: "20px",
                            width: "100%"
                        }}
                    >
                        <InputField
                            label="Hari"
                            id="id_hari"
                            name="id_hari"
                            value={form.id_hari}
                            onChanged={inputChange}
                            type="select"
                            option={days}
                            placeholder={"Pilih Hari"}
                            isLoading={loading}
                        />
                        <InputField
                            label="Mesin"
                            id="id_mesin"
                            name="id_mesin"
                            value={form.id_mesin}
                            onChanged={inputChange}
                            type="select"
                            option={machine}
                            placeholder={"Pilih Mesin"}
                            isLoading={loading}
                        />
                        <ButtonSubmit color="primary" loading={store} onClicked={ handleFind }>
                            Cari
                        </ButtonSubmit>
                    </div>
                    <Table
                        tableColumns={ columnMesin }
                        tableLoading={ loading }
                        tableRows={ rows.mesin }
                        tableInfo={ info }
                    />
                </Card>
            </div>
        </PageLayout>
    )
}

export default Dashboard