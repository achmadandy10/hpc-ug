import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LoadingElement } from "../../../../components/loading/Loading"
import { ServiceContentCard, ServiceContentContainer, ServiceContentThumbnail, ServiceContentTitle } from "./ServiceContent.elements"

const ServiceContent = () => {
    const { slug } = useParams()
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState({})

    useEffect(() => {
        const GetDetail = () => {
            axios.get('/api/content/show/service/' + slug).then(res => {
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

    console.log("test")

    return (
        <ServiceContentContainer>
            <ServiceContentCard>
                <ServiceContentThumbnail src={ detail.thumbnail }/>
                <ServiceContentTitle>{ detail.title }</ServiceContentTitle>
                <div dangerouslySetInnerHTML={{ __html: detail.body }}/>
            </ServiceContentCard>
        </ServiceContentContainer>
    )
}

export default ServiceContent