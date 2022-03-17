import axios from "axios"
import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import { ButtonIconLink, ButtonIconSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Table, { TableAction } from "../../../components/table/Table"

const UserList = () => {
    const [get, setGet] = useState(true)
    const [rows, setRows] = useState([])

    const GetData = () => {
        axios.get(`/api/admin-super/user/show-all-user`).then(res => {
            if (res.data.meta.code === 200) {
                setRows(res.data.data.user)
                setGet(false)
            }
        })
    }

    useEffect(() => {
        GetData()
    }, [])

    const handleDelete = (id) => {
        axios.post(`/api/admin-super/user/delete-user/${id}`).then(res => {
            if (res.data.meta.code === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Sukses!",
                    text: "Akun user berhasil dihapus."
                })
                GetData()
            } else {
                Swal.fire({
                    icon: "danger",
                    title: "Peringatan!",
                    text: "Akun user gagal dihapus."
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
                        {params.row.user_profile.first_name + " " + params.row.user_profile.last_name}
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
            field: 'college',
            headerName: 'Instansi',
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.user_profile.college}
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
                            <ButtonIconLink to={ `/admin/ubah-user/${ params.row.id }` } color="info">
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
            <PageHeader title={ "Daftar User" }/>

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

export default UserList