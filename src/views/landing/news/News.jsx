import { useEffect, useState } from "react"
import { NewsContainer, NewsContent, NewsDetail, NewsDetailBody, NewsDetailButtonRead, NewsDetailData, NewsDetailDate, NewsDetailImg, NewsDetailTitle, NewsHeader } from "./News.elements"
import dateFormat from "dateformat"
import { FaChevronRight } from "react-icons/fa"
import { LoadingElement } from "../../../components/loading/Loading"
import axios from "axios"
import { RemoveHTML } from "../../../services/RemoveHTML"

const News = () => {
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)

    useEffect(() => {
       const GetContent = () => {
            axios.get(`/api/post`).then(res => {
                if (res.data.meta.code === 200) {
                    setContent(res.data.data.post)
                    setLoading(false)
                }
            })
        } 

       GetContent()
    }, [])

    let contentElement = ''

    if (loading) {
        contentElement = <LoadingElement/>
    } else {
        contentElement = content.map((value, index) => {
            var newTitle = ''

            if (value.title !== null) {
                if (window.innerWidth <= 500) {
                    if (value.title.length <= 25) {
                        newTitle = value.title
                    } else {
                        newTitle = `${value.title.substring(0, 25)}...`
                    }
                } else if (window.innerWidth <= 768) {
                    if (value.title.length <= 25) {
                        newTitle = value.title
                    } else {
                        newTitle = `${value.title.substring(0, 25)}...`
                    }
                } else if (window.innerWidth <= 25) {
                    if (value.title.length <= 200) {
                        newTitle = value.title
                    } else {
                        newTitle = `${value.title.substring(0, 25)}...`
                    }
                } else {
                    if (value.title.length <= 25) {
                        newTitle = value.title
                    } else {
                        newTitle = `${value.title.substring(0, 25)}...`
                    }
                }
            }
    
            var newBody = ''
    
            if (value.body !== null) {
                if (window.innerWidth <= 500) {
                    if (value.body.length <= 50) {
                        newBody = value.body
                    } else {
                        newBody = `${value.body.substring(0, 50)}...`
                    }
                } else if (window.innerWidth <= 768) {
                    if (value.body.length <= 100) {
                        newBody = value.body
                    } else {
                        newBody = `${value.body.substring(0, 100)}...`
                    }
                } else if (window.innerWidth <= 1024) {
                    if (value.body.length <= 200) {
                        newBody = value.body
                    } else {
                        newBody = `${value.body.substring(0, 200)}...`
                    }
                } else {
                    if (value.body.length <= 300) {
                        newBody = value.body
                    } else {
                        newBody = `${value.body.substring(0, 300)}...`
                    }
                }
            }

            return (
                <NewsDetail key={ index }>
                    <NewsDetailImg src={ value.thumbnail }/>
                    <NewsDetailData>
                        <div>
                            <NewsDetailTitle>{ newTitle }</NewsDetailTitle>
                            <NewsDetailDate>{ dateFormat(value.created_at, 'dd mmmm yyyy') }</NewsDetailDate>
                            <NewsDetailBody>{ RemoveHTML(newBody) }</NewsDetailBody>
                        </div>
                        <NewsDetailButtonRead to={ "/berita/view?id=" + value.id + "&slug=" + value.slug }>Lihat <FaChevronRight/></NewsDetailButtonRead>
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