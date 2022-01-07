import axios from "axios"
import { useEffect, useState } from "react"
import { ButtonLink } from "../../../components/button/Button"
import { LoadingElement } from "../../../components/loading/Loading"
import { ServiceContainer, ServiceContent, ServiceContentImg, ServiceContentItem, ServiceContentOverlay, ServiceContentTitle, ServiceTitle } from "./Service.elements"

const Service = () => {
    const [loading, setLoading] = useState(true)
    const [service, setService] = useState([])

    useEffect(() => {
        const GetUri = () => {
            axios.get('/api/content/uri').then(res => {
                if (res.data.meta.code === 200) {
                    setService(res.data.data.uri_service)
                }
                setLoading(false)
            })
        }

        GetUri()
    }, [])

    let element = ''

    if (loading) {
        element = <LoadingElement/>
    } else {
        element = service.map((v, idx) => {
            return (
                <ServiceContentItem key={idx}>
                    <ServiceContentImg src={v.thumbnail}/>
                    <ServiceContentOverlay>
                        <ServiceContentTitle>{v.label}</ServiceContentTitle>
                        <ButtonLink to={"/layanan/"+v.slug}>Lihat</ButtonLink>
                    </ServiceContentOverlay>
                </ServiceContentItem>
            )
        })
    }

    return (
        <ServiceContainer>
            <ServiceTitle>Layanan</ServiceTitle>
            <ServiceContent>
                { element }
            </ServiceContent>
        </ServiceContainer>
    )
}

export default Service