import { useEffect, useState } from "react"
import { ListPost } from "../../../Dummy"
import { NewsContainer, NewsContent, NewsDetail, NewsDetailBody, NewsDetailButtonRead, NewsDetailData, NewsDetailDate, NewsDetailImg, NewsDetailTitle, NewsHeader } from "./News.elements"
import dateFormat from "dateformat"
import { FaChevronRight } from "react-icons/fa"
import { LoadingElement } from "../../../components/loading/Loading"

const News = () => {
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)

    useEffect(() => {
       const GetContent = () => {
            setContent(ListPost.post)
            setLoading(false)
        } 

       GetContent()
    }, [])

    let contentElement = ''

    if (loading) {
        contentElement = <LoadingElement/>
    } else {
        contentElement = content.map((value, index) => {
            return (
                <NewsDetail key={ index }>
                    <NewsDetailImg src={ value.thumbnail }/>
                    <NewsDetailData>
                        <div>
                            <NewsDetailTitle>{ value.title }</NewsDetailTitle>
                            <NewsDetailDate>{ dateFormat(value.created_at, 'dd mmmm yyyy') }</NewsDetailDate>
                            <NewsDetailBody>{ value.body.substring(0, 200) + "..." }</NewsDetailBody>
                        </div>
                        <NewsDetailButtonRead to={ "/berita/" + value.slug }>Lihat <FaChevronRight/></NewsDetailButtonRead>
                    </NewsDetailData>
                </NewsDetail>
            )
        })
    }

    return (
        <NewsContainer>
            <NewsHeader>Berita</NewsHeader>
            <NewsContent>
                { contentElement }
            </NewsContent>
        </NewsContainer>
    )
}

export default News