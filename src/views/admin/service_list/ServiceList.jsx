import { useEffect, useState } from "react"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { SearchField } from "../../../components/text_field/TextField"
import { ServiceListContainer, ServiceListContent, ServiceListContentContainer, ServiceListContentDetail, ServiceListContentDetailBottom, ServiceListContentDetailDate, ServiceListContentDetailFeature, ServiceListContentDetailTitle, ServiceListContentDetailTop, ServiceListContentImg } from "./ServiceList.elements"
import dateFormat from "dateformat"
import { FaCircle, FaEdit, FaEye, FaTrash } from "react-icons/fa"
import { MdSendAndArchive } from "react-icons/md"
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import { LoadingElement } from "../../../components/loading/Loading"

const ServiceList = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState([])

    const searchInput = (value) => {
        setData(value)
    }

    const GetService = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get('/api/' + url + '/content/show-all-service').then(res => {
            setData(res.data.data.content)
            setSearch(res.data.data.content)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetService()
    }, [])

    const draftService = (id, slug) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Benar ingin draf layanan?',
            text: 'Pilih "Draf" jika Anda benar ingin draf layanan.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Draf',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/content/draft/' + id + '/' + slug, data).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Layanan berhasil didraf.',
                        })
                        GetService()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Layanan gagal didraf."
                        })
                    }
                })
            }
        })
    }

    const deleteService = (id, slug) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Benar ingin menghapus layanan?',
            text: 'Pilih "Hapus" jika Anda benar ingin menghapus layanan.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/content/delete/' + id + '/' + slug, data).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Layanan berhasil dihapus.',
                        })
                        GetService()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Layanan gagal dihapus."
                        })
                    }
                })
            }
        })
    }

    let contentElement = ''

    if (loading) {
        contentElement = <LoadingElement/>
    } else {
        contentElement = data.map((value, index) => {
            let date = ''

            if (value.status === "Draft") {
                const dateService = dateFormat(value.updated_at, "dd mmmm") 
                date = (
                    <>
                        <span style={{ color: "var(--warning-color)" }}>
                            Draf
                        </span>
                        <FaCircle/>
                        {dateService}
                    </>
                )
            } else {
                const dateService = dateFormat(value.created_at, "dd mmm")
                date = (
                    <>
                        Dipublikasikan 
                        <FaCircle/>
                        {dateService}
                    </>
                )
            }
            return (
                <ServiceListContent key={ index }>
                    <ServiceListContentImg src={ value.thumbnail }/>
                    <ServiceListContentDetail>
                        <ServiceListContentDetailTop>
                            <ServiceListContentDetailTitle>{ value.title === null ? "Tanpa Judul" : value.title  }</ServiceListContentDetailTitle>
                            <ServiceListContentDetailFeature>
                                <>
                                    {
                                        value.status === "Draft" ?
                                            ""
                                        :
                                            <Tooltip title="Kembali ke draf">
                                                <IconButton onClick={ () => draftService(value.id, value.slug) }>
                                                    <MdSendAndArchive/>
                                                </IconButton>
                                            </Tooltip>
                                    }
                                    <Tooltip title="Hapus layanan ini">
                                        <IconButton onClick={ () => deleteService(value.id, value.slug) }>
                                            <FaTrash/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Ubah">
                                        <IconButton  onClick={ () => history.push("/admin/layanan/ubah?id=" + value.id + "&slug=" + value.slug) }>
                                            <FaEdit/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Pratinjau">
                                        <IconButton  onClick={ () => history.push("/admin/layanan/pratinjau?id=" + value.id + "&slug=" + value.slug) }>
                                            <FaEye/>
                                        </IconButton>
                                    </Tooltip>
                                </>
                            </ServiceListContentDetailFeature>
                        </ServiceListContentDetailTop>
                        <ServiceListContentDetailBottom>
                            <ServiceListContentDetailDate>{ date }</ServiceListContentDetailDate>
                        </ServiceListContentDetailBottom>
                    </ServiceListContentDetail>
                </ServiceListContent>
            )
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Daftar Layanan"/>
            <Card>
                <ServiceListContainer>
                    <SearchField
                        data={ search }
                        onChanged={ searchInput }
                    />
                </ServiceListContainer>
                <ServiceListContentContainer>
                    { contentElement }
                </ServiceListContentContainer>
            </Card>
        </PageLayout>
    )
}

export default ServiceList