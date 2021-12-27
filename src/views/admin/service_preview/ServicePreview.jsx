import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Card from "../../../components/card/Card"
import { useQuery } from "../../../services/QueryParams";
import { useState, useEffect } from "react";
import axios from "axios";
import { ServicePreviewContentDetailBody, ServicePreviewContentDetailDate, ServicePreviewContentDetailThumbnail, ServicePreviewContentDetailTitle } from "./ServicePreview.elements";
import dateFormat from "dateformat";
import { LoadingElement } from "../../../components/loading/Loading";

const ServicePreview = () => {
    let query = useQuery();
    const [loading, setLoading] = useState(true)
    const [service, setService] = useState(null)

    useEffect(() => {
        const GetService = () => {
            var url = ''
            if (sessionStorage.getItem('role') === "Content") {
                url = 'admin-content'
            } else if (sessionStorage.getItem('role') === "Super") {
                url = 'admin-super'
            }

            axios.get('/api/' + url + '/content/show/' + query.get('id') + '/' + query.get('slug')).then(res => {
                if ( res.data.meta.code === 200 ) {
                    setService(res.data.data.content)
                }
                setLoading(false)
            })
        }

        GetService()
    }, [query])

    return (
        <PageLayout>
            <PageHeader title="Pratinjau Layanan"/>

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
                                <ServicePreviewContentDetailTitle>{ service.title ? service.title : "Tanpa Judul" }</ServicePreviewContentDetailTitle>
                                <ServicePreviewContentDetailDate>{ dateFormat(service.created_at, 'dd mmmm yyyy') }</ServicePreviewContentDetailDate>
                            </div>
                            <ServicePreviewContentDetailThumbnail src={ service.thumbnail }/>
                            <ServicePreviewContentDetailBody dangerouslySetInnerHTML={{ __html: service.body }}/>
                        </div>
                }
            </Card>
        </PageLayout>
    )
}

export default ServicePreview