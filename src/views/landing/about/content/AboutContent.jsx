import { AboutContentCard, AboutContentContainer, AboutContentThumbnail, AboutContentTitle } from "./AboutContent.elements"

const AboutContent = () => {
    return (
        <AboutContentContainer>
            <AboutContentCard>
                <AboutContentThumbnail src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmovietvtechgeeks.com%2Fwp-content%2Fuploads%2F2015%2F05%2Fmost-common-server-problems.jpg&f=1&nofb=1"/>
                <AboutContentTitle>HPC</AboutContentTitle>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab possimus numquam quo rerum a consequuntur assumenda ad, est voluptates. Neque quia incidunt ipsa nemo beatae dicta quaerat necessitatibus ipsam? Ipsam?
                    <br/>
                    <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorum perspiciatis magni maiores nisi, laborum delectus dicta autem illum inventore suscipit iure ducimus totam sunt molestias itaque et ab vel ex provident eaque? Veniam dolore consequuntur voluptate minima libero repellendus, quis et minus! Dolores autem atque voluptatem totam, magnam, obcaecati nemo, quia quam beatae odit necessitatibus dolorum! Quasi libero quos reprehenderit nobis molestias consequuntur deleniti iste sunt asperiores voluptate? Cum, aliquam maiores amet quae eius deleniti aliquid qui officiis fuga velit voluptates voluptatibus alias porro fugiat illum possimus facere suscipit laudantium natus praesentium iste harum sapiente, excepturi distinctio! Soluta, dolores.
                </div>
            </AboutContentCard>
        </AboutContentContainer>
    )
}

export default AboutContent