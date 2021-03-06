import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LoadingElement } from "../../../../components/loading/Loading"
import { AboutContentCard, AboutContentContainer, AboutContentThumbnail, AboutContentTitle } from "./AboutContent.elements"

const AboutContent = () => {
    const { slug } = useParams()
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState({})

    useEffect(() => {
        const GetDetail = () => {
            axios.get('/api/content/show/about/' + slug).then(res => {
                if (res.data.meta.code === 200) {
                    setDetail(res.data.data.content)
                }
                setLoading(false)
            })
        }

        GetDetail()
    }, [slug])

    if (loading) {
        return <LoadingElement/>
    }

    return (
        <AboutContentContainer>
            <AboutContentCard>
                <AboutContentThumbnail src={ detail.thumbnail }/>
                <AboutContentTitle>{ detail.title }</AboutContentTitle>
                <div dangerouslySetInnerHTML={{ __html: detail.body }}/>
            </AboutContentCard>
        </AboutContentContainer>
    )
}

export default AboutContent