import { useEffect, useState } from "react"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { SearchField } from "../../../components/text_field/TextField"
import { ListPost } from "../../../Dummy"
import { PostListContainer, PostListContent, PostListContentBody, PostListContentCategory, PostListContentCategoryContainer, PostListContentContainer, PostListContentImg, PostListContentLeft, PostListContentRight, PostListContentTitle } from "./PostList.elements"
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
            return (
                <PostListContent key={ index } to={ value.slug }>
                    <PostListContentLeft>
                        <PostListContentImg src={ value.thumbnail }/>
                    </PostListContentLeft>

                    <PostListContentRight>
                        <PostListContentTitle>{ value.title }</PostListContentTitle>
                        <PostListContentBody>{ value.body }</PostListContentBody>
                        <PostListContentCategoryContainer>
                            {
                                value.category.map((value, index) => {
                                    return (
                                        <PostListContentCategory to={ value } key={ index }>
                                            { value }
                                        </PostListContentCategory>
                                    )
                                })
                            }
                        </PostListContentCategoryContainer>
                    </PostListContentRight>
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