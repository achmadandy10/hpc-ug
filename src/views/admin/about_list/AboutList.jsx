import { useEffect, useState } from "react"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { SearchField } from "../../../components/text_field/TextField"
import { AboutListContainer, AboutListContent, AboutListContentContainer, AboutListContentDetail, AboutListContentDetailBottom, AboutListContentDetailDate, AboutListContentDetailFeature, AboutListContentDetailTitle, AboutListContentDetailTop, AboutListContentImg } from "./AboutList.elements"
import dateFormat from "dateformat"
import { FaCircle, FaEdit, FaEye, FaTrash } from "react-icons/fa"
import { MdSendAndArchive } from "react-icons/md"
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import { LoadingElement } from "../../../components/loading/Loading"

const AboutList = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState([])

    const searchInput = (value) => {
        setData(value)
    }

    const GetAbout = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get('/api/' + url + '/content/show-all-about').then(res => {
            setData(res.data.data.content)
            setSearch(res.data.data.content)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetAbout()
    }, [])

    const draftAbout = (id, slug) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Benar ingin draf tentang?',
            text: 'Pilih "Draf" jika Anda benar ingin draf tentang.',
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
                            text:'Tentang berhasil didraf.',
                        })
                        GetAbout()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Tentang gagal didraf."
                        })
                    }
                })
            }
        })
    }

    const deleteAbout = (id, slug) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Benar ingin menghapus tentang?',
            text: 'Pilih "Hapus" jika Anda benar ingin menghapus tentang.',
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
                            text:'Tentang berhasil dihapus.',
                        })
                        GetAbout()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Tentang gagal dihapus."
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
                const dateAbout = dateFormat(value.updated_at, "dd mmmm") 
                date = (
                    <>
                        <span style={{ color: "var(--warning-color)" }}>
                            Draf
                        </span>
                        <FaCircle/>
                        {dateAbout}
                    </>
                )
            } else {
                const dateAbout = dateFormat(value.created_at, "dd mmm")
                date = (
                    <>
                        Dipublikasikan 
                        <FaCircle/>
                        {dateAbout}
                    </>
                )
            }
            return (
                <AboutListContent key={ index }>
                    <AboutListContentImg src={ value.thumbnail }/>
                    <AboutListContentDetail>
                        <AboutListContentDetailTop>
                            <AboutListContentDetailTitle>{ value.title === null ? "Tanpa Judul" : value.title  }</AboutListContentDetailTitle>
                            <AboutListContentDetailFeature>
                                <>
                                    {
                                        value.status === "Draft" ?
                                            ""
                                        :
                                            <Tooltip title="Kembali ke draf">
                                                <IconButton onClick={ () => draftAbout(value.id, value.slug) }>
                                                    <MdSendAndArchive/>
                                                </IconButton>
                                            </Tooltip>
                                    }
                                    <Tooltip title="Hapus tentang ini">
                                        <IconButton onClick={ () => deleteAbout(value.id, value.slug) }>
                                            <FaTrash/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Ubah">
                                        <IconButton  onClick={ () => history.push("/admin/tentang/ubah?id=" + value.id + "&slug=" + value.slug) }>
                                            <FaEdit/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Pratinjau">
                                        <IconButton  onClick={ () => history.push("/admin/tentang/pratinjau?id=" + value.id + "&slug=" + value.slug) }>
                                            <FaEye/>
                                        </IconButton>
                                    </Tooltip>
                                </>
                            </AboutListContentDetailFeature>
                        </AboutListContentDetailTop>
                        <AboutListContentDetailBottom>
                            <AboutListContentDetailDate>{ date }</AboutListContentDetailDate>
                        </AboutListContentDetailBottom>
                    </AboutListContentDetail>
                </AboutListContent>
            )
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Daftar Tentang"/>
            <Card>
                <AboutListContainer>
                    <SearchField
                        data={ search }
                        onChanged={ searchInput }
                    />
                </AboutListContainer>
                <AboutListContentContainer>
                    { contentElement }
                </AboutListContentContainer>
            </Card>
        </PageLayout>
    )
}

export default AboutList