import { NewsContentContainer, NewsContentDetail, NewsContentDetailBody, NewsContentDetailCategory, NewsContentDetailCategoryLink, NewsContentDetailDate, NewsContentDetailThumbnail, NewsContentDetailTitle, NewsContentFeature } from "./NewsContent.elements"
import { useQuery } from "../../../../services/QueryParams"
import { useEffect, useState } from "react"
import axios from "axios"
import dateFormat from "dateformat"

const NewsContent = () => {
    const query = useQuery()
    const [detail, setDetail] = useState({})

    useEffect(() => {
        axios.get(`/api/post/show/` + query.get("id") + `/` + query.get("slug")).then(res => {
            if (res.data.meta.code === 200) {
                setDetail(res.data.data.post)
            }
        })
    }, [query])

    return (
        <NewsContentContainer>
            <NewsContentDetail>
                <div>
                    <NewsContentDetailTitle>{ detail.title }</NewsContentDetailTitle>
                    <NewsContentDetailDate>{ dateFormat(detail.created_at, 'dd mmm yyyy') }</NewsContentDetailDate>
                </div>
                <NewsContentDetailThumbnail src={ detail.thumbnail }/>
                <NewsContentDetailBody dangerouslySetInnerHTML={{ __html: detail.body }}/>
                <NewsContentDetailCategory>
                    <span>Kategori :</span>
                    {
                        detail.categories.map((value, index) => {
                            return (
                                <NewsContentDetailCategoryLink 
                                    key={ index }
                                    to={ "/berita/category?label=" + value.slug }
                                >
                                    { value.label 
                                }</NewsContentDetailCategoryLink>
                            )
                        })
                    }
                </NewsContentDetailCategory>
            </NewsContentDetail>
            <NewsContentFeature>
                Cooming Soon
            </NewsContentFeature>
        </NewsContentContainer>
    )
}

export default NewsContent