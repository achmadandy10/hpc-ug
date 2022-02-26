import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"
import Table, { TableAction, TableStatus } from "../../../components/table/Table"
import { useEffect, useState } from "react"
import dateFormat from "dateformat"
import { ButtonIconLink, ButtonIconSubmit } from "../../../components/button/Button"
import axios from "axios"
import Swal from "sweetalert2"
import { InputField } from "../../../components/text_field/TextField"
import { ButtonSubmit } from "../../../components/button/Button"

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [store, setStore] = useState(false)
    const [rows, setRows] = useState([])
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

    const GetDetail = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://202.125.94.143:8181/run/1/42873ec8-8b77-437f-bec2-5c447cffe721/all/stanley160990", requestOptions)
        .then(response => response.json())
        .then(result => {
            setRows(result.data)
            setLoading(false)
        })
        .catch(error => console.log('error', error));
    }

    const handleFind = () => {
        if (form.id_hari === '' && form.id_mesin === '') {
            Swal.fire({
                icon: "warning",
                title: "Peringatan!",
                text: "Silahkan pilih hari dan mesin terlebih dahulu."
            })
            
            return false
        }

        setStore(true)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(`http://202.125.94.143:8181/run/${form.id_hari}/${form.id_mesin}/all/${localStorage.username}`, requestOptions)
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
              
            fetch("http://202.125.94.143:8181/hari", requestOptions)
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
              
            fetch("http://202.125.94.143:8181/mesin", requestOptions)
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

            setLoading(false)
        }

        GetData()
    }, [])

    const deleteSubmit = (id, status) => {
        if (status === "Approved" || status === "Finished") {
            Swal.fire({
                icon:'danger',
                title: 'Gagal!',
                text:'Usulan gagal dihapus.',
            })
        } else {
            var url = ''
            if (localStorage.getItem('role') === "Internal") {
                url = 'user-internal'
            } else if (localStorage.getItem('role') === "External") {
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

            <Card>
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
                    tableColumns={ columns }
                    tableLoading={ loading }
                    tableRows={ rows }
                    tableInfo={ info }
                />
            </Card>
        </PageLayout>
    )
}

export default Dashboard