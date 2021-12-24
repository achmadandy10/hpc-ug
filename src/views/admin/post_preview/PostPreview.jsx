import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Card from "../../../components/card/Card"
import { useQuery } from "../../../services/QueryParams";
import { useState, useEffect } from "react";
import axios from "axios";
import { PostPreviewContentDetailBody, PostPreviewContentDetailCategory, PostPreviewContentDetailCategoryLink, PostPreviewContentDetailDate, PostPreviewContentDetailThumbnail, PostPreviewContentDetailTitle } from "./PostPreview.elements";
import dateFormat from "dateformat";

const PostPreview = () => {
    let query = useQuery();
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState(null)

    useEffect(() => {
        const GetPost = () => {
            var url = ''
            if (sessionStorage.getItem('role') === "Content") {
                url = 'admin-content'
            } else if (sessionStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }

            axios.get('/api/' + url + '/post/show/' + query.get('id') + '/' + query.get('slug')).then(res => {
                if ( res.data.meta.code === 200 ) {
                    setPost(res.data.data.post)
                }
                setLoading(false)
            })
        }

        GetPost()
    }, [query])

    return (
        <PageLayout>
            <PageHeader title="Pratinjau Konten"/>

            <Card>
                {
                    loading ?
                        "loading..."
                    :
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                            }}
                        >
                            <div>
                                <PostPreviewContentDetailTitle>{ post.title }</PostPreviewContentDetailTitle>
                                <PostPreviewContentDetailDate>{ dateFormat(post.created_at, 'dd mmmm yyyy') }</PostPreviewContentDetailDate>
                            </div>
                            <PostPreviewContentDetailThumbnail src={ post.thumbnail }/>
                            <PostPreviewContentDetailBody dangerouslySetInnerHTML={{ __html: post.body }}/>
                            <PostPreviewContentDetailCategory>
                                <span>Kategori: </span>
                                {
                                    post.categories !== [] ?
                                        post.categories.map((value, index) => {
                                            return (
                                                <PostPreviewContentDetailCategoryLink key={ index }>
                                                    { value.label }
                                                </PostPreviewContentDetailCategoryLink>
                                            )
                                        })
                                    :
                                        ""
                                }
                            </PostPreviewContentDetailCategory>
                        </div>
                }
            </Card>
        </PageLayout>
    )
}

export default PostPreview