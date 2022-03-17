import axios from "axios"
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa"
import { ButtonIconSubmit } from "../../../components/button/Button"
import Card from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import Table, { TableAction } from "../../../components/table/Table"

const Procedure = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const GetData = () => {
        var url = ''
        if (localStorage.getItem('role') === "Internal") {
            url = 'user-internal'
        } else if (localStorage.getItem('role') === "External") {
            url = 'user-external'
        }

        axios.get('/api/' + url + '/procedure/show-all').then(res => {
            setData(res.data.data.procedure)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData()
    }, [])

    const columns = [
        {
            field: 'type',
            headerName: 'Jenis',
            width: 200,
        },
        {
            field: 'document_type',
            headerName: 'Jenis Dokumen',
            width: 350,
        },
        {
            field: 'file',
            headerName: 'File',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <TableAction>
                            <ButtonIconSubmit onClicked={ () => window.open(process.env.REACT_APP_API_URL + '/procedure/file/' + params.row.file, "_blank") } color="info">
                                <FaEye/>
                            </ButtonIconSubmit>
                        </TableAction>
                    </>
                )
            },
        },
    ]
    
    return (
        <PageLayout>
            <PageHeader title="Daftar Prosedur dan Template"/>

                <Card>
                    <Table
                        tableColumns={ columns }
                        tableLoading={ loading }
                        tableRows={ data }
                    />
                </Card>
        </PageLayout>
    )
}

export default Procedure