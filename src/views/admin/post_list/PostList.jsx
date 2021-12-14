import { useEffect, useState } from "react"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { SearchField } from "../../../components/text_field/TextField"
import { ListPost } from "../../../Dummy"
import { PostListContainer, PostListContent, PostListContentCategory, PostListContentContainer, PostListContentDetail, PostListContentDetailBottom, PostListContentDetailCategory, PostListContentDetailDate, PostListContentDetailFeature, PostListContentDetailTitle, PostListContentDetailTop, PostListContentImg } from "./PostList.elements"
import dateFormat from "dateformat"
import { FaCircle, FaEye, FaTag, FaTrash } from "react-icons/fa"
import { MdSend, MdSendAndArchive } from "react-icons/md"
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const PostList = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [search, setSearch] = useState([])

    const searchInput = (value) => {
        setData(value)
    }

    useEffect(() => {
        setData(ListPost.post)
        setSearch(ListPost.post)
        setLoading(false)
    }, [])

    let contentElement = ''

    if (loading) {
        contentElement = "loading..."
    } else {
        contentElement = data.map((value, index) => {
            let date = ''

            if (value.status === "Draf") {
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
                <PostListContent key={ index } to={ "/admin/konten/edit?slug=" + value.slug + "&id=" + value.id }>
                    <PostListContentImg src={ value.thumbnail }/>
                    <PostListContentDetail>
                        <PostListContentDetailTop>
                            <PostListContentDetailTitle>{ value.title }</PostListContentDetailTitle>
                            <PostListContentDetailFeature>
                                        <>
                                            {
                                                value.status === "Draf" ?
                                                    <Tooltip title="Publikasikan">
                                                        <IconButton>
                                                            <MdSend/>
                                                        </IconButton>
                                                    </Tooltip>
                                                :
                                                    <Tooltip title="Kembali ke draf">
                                                        <IconButton>
                                                            <MdSendAndArchive/>
                                                        </IconButton>
                                                    </Tooltip>
                                            }
                                            <Tooltip title="Tambah kategori">
                                                <IconButton>
                                                    <FaTag/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Hapus konten ini">
                                                <IconButton>
                                                    <FaTrash/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Pratinjau">
                                                <IconButton>
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
                                    value.category.map((v, idx) => {
                                        return (
                                            <PostListContentCategory key={ idx }>
                                                { v }
                                            </PostListContentCategory>
                                        )
                                    })
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