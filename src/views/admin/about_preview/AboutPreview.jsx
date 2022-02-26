import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Card from "../../../components/card/Card"
import { useQuery } from "../../../services/QueryParams";
import { useState, useEffect } from "react";
import axios from "axios";
import { AboutPreviewContentDetailBody, AboutPreviewContentDetailDate, AboutPreviewContentDetailThumbnail, AboutPreviewContentDetailTitle } from "./AboutPreview.elements";
import dateFormat from "dateformat";
import { LoadingElement } from "../../../components/loading/Loading";

const AboutPreview = () => {
    let query = useQuery();
    const [loading, setLoading] = useState(true)
    const [about, setAbout] = useState(null)

    useEffect(() => {
        const GetAbout = () => {
            var url = ''
            if (localStorage.getItem('role') === "Content") {
                url = 'admin-content'
            } else if (localStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }

            axios.get('/api/' + url + '/content/show/' + query.get('id') + '/' + query.get('slug')).then(res => {
                if ( res.data.meta.code === 200 ) {
                    setAbout(res.data.data.content)
                }
                setLoading(false)
            })
        }

        GetAbout()
    }, [query])

    return (
        <PageLayout>
            <PageHeader title="Pratinjau Tentang"/>

            <Card>
                {
                    loading ?
                        <LoadingElement/>
                    :
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                            }}
                        >
                            <div>
                                <AboutPreviewContentDetailTitle>{ about.title ? about.title : "Tanpa Judul" }</AboutPreviewContentDetailTitle>
                                <AboutPreviewContentDetailDate>{ dateFormat(about.created_at, 'dd mmmm yyyy') }</AboutPreviewContentDetailDate>
                            </div>
                            <AboutPreviewContentDetailThumbnail src={ about.thumbnail }/>
                            <AboutPreviewContentDetailBody dangerouslySetInnerHTML={{ __html: about.body }}/>
                        </div>
                }
            </Card>
        </PageLayout>
    )
}

export default AboutPreview