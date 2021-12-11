import Card, { CardHeader } from "../../../components/card/Card"
import PageLayout, { PageHeader } from "../../../components/page_layout/PageLayout"
import { ProposalSubmissionContainer } from "./ProposalSubmission.elements"

const ProposalSubmission = () => {
    return (
        <>
            <PageLayout>
                <PageHeader title="Pengajuan Usulan"/>

                <Card>
                    <CardHeader title="Formulir Pengajuan Usulan"/>
                    <ProposalSubmissionContainer>
                        <div>test</div>
                        <div>test</div>
                    </ProposalSubmissionContainer>
                </Card>
            </PageLayout>
        </>
    )
}

export default ProposalSubmission