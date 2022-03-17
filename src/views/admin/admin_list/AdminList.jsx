import axios from "axios"
import { useEffect, useState } from "react"
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import { ButtonIconLink, ButtonIconSubmit, ButtonLink } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Table, { TableAction } from "../../../components/table/Table"

const AdminList = () => {
    const [get, setGet] = useState(true)
    const [rows, setRows] = useState([])

    const GetData = () => {
        axios.get(`/api/admin-super/user/show-all-admin`).then(res => {
            if (res.data.meta.code === 200) {
                setRows(res.data.data.admin)
                setGet(false)
            }
        })
    }

    useEffect(() => {
        GetData()
    }, [])

    const handleDelete = (id) => {
        axios.post(`/api/admin-super/user/delete-admin/${id}`).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Akun admin berhasil dihapus."
                })
                GetData()
            } else {
                Swal.fire({
                    icon: "danger",
                    title: "Peringatan!",
                    text: "Akun admin gagal dihapus."
                })
            }
        })
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 150,
        },
        {
            field: 'name',
            headerName: 'Nama',
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.admin_profile.first_name + " " + params.row.admin_profile.last_name}
                    </>
                )
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            renderCell: (params) => {
                let role = ''
                
                if (params.row.role === 1) {
                    role = "Konten"
                } else if(params.row.role === 2) {
                    role = "Proposal"
                } else if (params.row.role === 3) {
                    role = "Super"
                }

                return (
                    <>
                        {role}
                    </>
                )
            },
        },
        {
            field: 'action',
            headerName: 'Aksi',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <TableAction>
                            <ButtonIconLink to={ `/admin/ubah-admin/${ params.row.id }` } color="info">
                                <FaEdit/>
                            </ButtonIconLink>
                            <ButtonIconSubmit onClicked={ () => handleDelete(params.row.id) } color="danger">
                                <FaTrash/>
                            </ButtonIconSubmit>
                        </TableAction>
                    </>
                )
            },
        },
    ]

    return (
        <PageLayout>
            <PageHeader title={ "Daftar Admin" }>
                <ButtonLink to={ "/admin/buat-admin" } color="primary">
                    <FaPlus />
                    Buat Admin
                </ButtonLink>
            </PageHeader>

            <Card>
                <Table
                    tableColumns={ columns }
                    tableLoading={ get }
                    tableRows={ rows }
                />
            </Card>
        </PageLayout>
    )
}

export default AdminList