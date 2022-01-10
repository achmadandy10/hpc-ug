import { NewsContentContainer, NewsContentDetail, NewsContentDetailBody, NewsContentDetailCategory, NewsContentDetailCategoryLink, NewsContentDetailDate, NewsContentDetailThumbnail, NewsContentDetailTitle, NewsContentFeature, NewsContentFeatureCard, NewsContentFeatureCardBody, NewsContentFeatureCardButton, NewsContentFeatureCardDetail, NewsContentFeatureCardImg, NewsContentFeatureCardTitle } from "./NewsContent.elements"
import { useQuery } from "../../../../services/QueryParams"
import { useEffect, useState } from "react"
import axios from "axios"
import dateFormat from "dateformat"
import { RemoveHTML } from "../../../../services/RemoveHTML"
import { ButtonLink } from "../../../../components/button/Button"

const NewsContent = () => {
    const query = useQuery()
    const [detail, setDetail] = useState({})
    const [category, setCategory] = useState([])
    const [hot, setHot] = useState([])

    useEffect(() => {
        const GetDetail = () => {
            axios.get(`/api/post/show/` + query.get("id") + `/` + query.get("slug")).then(res => {
                if (res.data.meta.code === 200) {
                    setDetail(res.data.data.post)
                    setCategory(res.data.data.post.categories)
                }
            })

            axios.get(`/api/post`).then(res => {
                if (res.data.meta.code === 200) {
                    setHot(res.data.data.post)
                }
            })
        }

        GetDetail()
    }, [query])

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

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
                        category.map((value, index) => {
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
                {
                    shuffle(hot.filter(post => post.id !== parseInt(query.get("id")))).slice(0, 5).map((value, index) => {
                        return (
                            <NewsContentFeatureCard key={ index }>
                                <NewsContentFeatureCardImg src={ value.thumbnail }/>

                                <NewsContentFeatureCardDetail>
                                    <NewsContentFeatureCardTitle>{ value.title }</NewsContentFeatureCardTitle>
                                    <NewsContentFeatureCardBody>{ RemoveHTML(value.body).slice(0, 20) + "..." }</NewsContentFeatureCardBody>
                                    <NewsContentFeatureCardButton>
                                        <ButtonLink
                                            to={ "/berita/view?id=" + value.id + "&slug=" + value.slug }
                                            width={ 100 }
                                            height={ 30 }
                                        >
                                            Lihat
                                        </ButtonLink>
                                    </NewsContentFeatureCardButton>
                                </NewsContentFeatureCardDetail>
                            </NewsContentFeatureCard>
                        )
                    })
                }
            </NewsContentFeature>
        </NewsContentContainer>
    )
}

export default NewsContent