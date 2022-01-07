import axios from "axios"
import { useEffect, useState } from "react"
import { ButtonLink } from "../../../components/button/Button"
import { LoadingElement } from "../../../components/loading/Loading"
import { AboutContainer, AboutContent, AboutContentImg, AboutContentItem, AboutContentOverlay, AboutContentTitle, AboutTitle } from "./About.elements"

const About = () => {
    const [loading, setLoading] = useState(true)
    const [about, setAbout] = useState([])

    useEffect(() => {
        const GetUri = () => {
            axios.get('/api/content/uri').then(res => {
                if (res.data.meta.code === 200) {
                    setAbout(res.data.data.uri_about)
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
        element = about.map((v, idx) => {
            return (
                <AboutContentItem key={idx}>
                    <AboutContentImg src={v.thumbnail}/>
                    <AboutContentOverlay>
                        <AboutContentTitle>{v.label}</AboutContentTitle>
                        <ButtonLink to={"/tentang/"+v.slug}>Lihat</ButtonLink>
                    </AboutContentOverlay>
                </AboutContentItem>
            )
        })
    }

    return (
        <AboutContainer>
            <AboutTitle>Tentang</AboutTitle>
            <AboutContent>
                { element }
            </AboutContent>
        </AboutContainer>
    )
}

export default About