import { useEffect, useState } from "react"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { SearchField } from "../../../components/text_field/TextField"
import { PostListContainer, PostListContent, PostListContentCategory, PostListContentContainer, PostListContentDetail, PostListContentDetailBottom, PostListContentDetailCategory, PostListContentDetailDate, PostListContentDetailFeature, PostListContentDetailTitle, PostListContentDetailTop, PostListContentImg } from "./PostList.elements"
import dateFormat from "dateformat"
import { FaCircle, FaEdit, FaEye, FaTrash } from "react-icons/fa"
import { MdSendAndArchive } from "react-icons/md"
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from "axios"
import { useHistory } from "react-router-dom"
import Swal from "sweetalert2"

const PostList = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState([])

    const searchInput = (value) => {
        setData(value)
    }

    const GetPost = () => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        axios.get('/api/' + url + '/post/show-all').then(res => {
            setData(res.data.data.post)
            setSearch(res.data.data.post)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetPost()
    }, [])

    const draftPost = (id, slug) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Benar ingin draf konten?',
            text: 'Pilih "Draf" jika Anda benar ingin draf konten.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Draf',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/post/draft/' + id + '/' + slug, data).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Konten berhasil didraf.',
                        })
                        GetPost()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Konten gagal didraf."
                        })
                    }
                })
            }
        })
    }

    const deletePost = (id, slug) => {
        var url = ''
        if (sessionStorage.getItem('role') === "Content") {
            url = 'admin-content'
        } else if (sessionStorage.getItem('role') === "Super") {
            url = 'admin-super'
        }

        Swal.fire({
            icon: 'question',
            title: 'Benar ingin menghapus konten?',
            text: 'Pilih "Hapus" jika Anda benar ingin menghapus konten.',
            showCancelButton: true,
            confirmButtonColor: "#5B3A89",
            cancelButtonColor: "#F34636",
            cancelButtonText: 'Batal',
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/' + url + '/post/delete/' + id + '/' + slug, data).then(res => {
                    if (res.data.meta.code === 200) {
                        Swal.fire({
                            icon:'success',
                            title: 'Sukses!',
                            text:'Konten berhasil dihapus.',
                        })
                        GetPost()
                    } else {
                        Swal.fire({
                            icon: "danger",
                            title: "Gagal!",
                            text: "Konten gagal dihapus."
                        })
                    }
                })
            }
        })
    }

    let contentElement = ''

    if (loading) {
        contentElement = "loading..."
    } else {
        contentElement = data.map((value, index) => {
            let date = ''

            if (value.status === "Draft") {
                const datePost = dateFormat(value.updated_at, "dd mmmm") 
                date = (
                    <>
                        <span style={{ color: "var(--warning-color)" }}>
                            Draf
                        </span>
                        <FaCircle/>
                        {datePost}
                    </>
                )
            } else {
                const datePost = dateFormat(value.created_at, "dd mmm")
                date = (
                    <>
                        Dipublikasikan 
                        <FaCircle/>
                        {datePost}
                    </>
                )
            }
            return (
                <PostListContent key={ index }>
                    <PostListContentImg src={ value.thumbnail }/>
                    <PostListContentDetail>
                        <PostListContentDetailTop>
                            <PostListContentDetailTitle>{ value.title === null ? "Tanpa Judul" : value.title  }</PostListContentDetailTitle>
                            <PostListContentDetailFeature>
                                <>
                                    {
                                        value.status === "Draft" ?
                                            ""
                                        :
                                            <Tooltip title="Kembali ke draf">
                                                <IconButton onClick={ () => draftPost(value.id, value.slug) }>
                                                    <MdSendAndArchive/>
                                                </IconButton>
                                            </Tooltip>
                                    }
                                    <Tooltip title="Hapus konten ini">
                                        <IconButton onClick={ () => deletePost(value.id, value.slug) }>
                                            <FaTrash/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Ubah">
                                        <IconButton  onClick={ () => history.push("/admin/konten/ubah?id=" + value.id + "&slug=" + value.slug) }>
                                            <FaEdit/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Pratinjau">
                                        <IconButton  onClick={ () => history.push("/admin/konten/pratinjau?id=" + value.id + "&slug=" + value.slug) }>
                                            <FaEye/>
                                        </IconButton>
                                    </Tooltip>
                                </>
                            </PostListContentDetailFeature>
                        </PostListContentDetailTop>
                        <PostListContentDetailBottom>
                            <PostListContentDetailDate>{ date }</PostListContentDetailDate>
                            <PostListContentDetailCategory>
                                {
                                    value.categories !== [] ?
                                        value.categories.map((v, idx) => {
                                            return (
                                                <PostListContentCategory key={ idx }>
                                                    { v.label }
                                                </PostListContentCategory>
                                            )
                                        })
                                    :
                                        ""
                                }
                            </PostListContentDetailCategory>
                        </PostListContentDetailBottom>
                    </PostListContentDetail>
                </PostListContent>
            )
        })
    }

    return (
        <PageLayout>
            <PageHeader title="Daftar Konten"/>
            <Card>
                <PostListContainer>
                    <SearchField
                        data={ search }
                        onChanged={ searchInput }
                    />
                </PostListContainer>
                <PostListContentContainer>
                    { contentElement }
                </PostListContentContainer>
            </Card>
        </PageLayout>
    )
}

export default PostList