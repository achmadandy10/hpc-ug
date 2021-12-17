import { NewsContentContainer, NewsContentDetail, NewsContentDetailBody, NewsContentDetailCategory, NewsContentDetailCategoryLink, NewsContentDetailDate, NewsContentDetailThumbnail, NewsContentDetailTitle, NewsContentFeature } from "./NewsContent.elements"

const NewsContent = () => {
    return (
        <NewsContentContainer>
            <NewsContentDetail>
                <div>
                    <NewsContentDetailTitle>Title</NewsContentDetailTitle>
                    <NewsContentDetailDate>12 December 2021</NewsContentDetailDate>
                </div>
                <NewsContentDetailThumbnail src="https://media.istockphoto.com/photos/robot-with-education-hud-picture-id966248982?k=20&m=966248982&s=612x612&w=0&h=gq35V9G0kfjKu0ttr90c8p0VraNtqPDkTvqWQ8oXzCk="/>
                <NewsContentDetailBody>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis, libero tempore. Necessitatibus expedita magni minima dolores vitae voluptatem dolor voluptatibus? Itaque explicabo reiciendis distinctio est et sed tempore nesciunt nisi, at fugiat praesentium, non quidem id quae dolorem maxime maiores libero consequatur aut vitae. Ullam, rem, facilis nihil optio rerum, minima vel natus pariatur reiciendis aspernatur possimus magni enim? Delectus tempore, dignissimos alias atque reprehenderit quibusdam doloribus sed molestiae nostrum ducimus iste maxime eos ipsum assumenda veritatis neque esse quis corrupti culpa tenetur. Perferendis magni deleniti hic maxime, rem doloribus dolorum consequatur qui dolor suscipit necessitatibus laboriosam! Fuga, quas? Totam?
                </NewsContentDetailBody>
                <NewsContentDetailCategory>
                    <span>Kategori :</span>
                    <NewsContentDetailCategoryLink>ctg 1</NewsContentDetailCategoryLink>
                    <NewsContentDetailCategoryLink>ctg 2</NewsContentDetailCategoryLink>
                    <NewsContentDetailCategoryLink>ctg 3</NewsContentDetailCategoryLink>
                </NewsContentDetailCategory>
            </NewsContentDetail>
            <NewsContentFeature>
                Cooming Soon
            </NewsContentFeature>
        </NewsContentContainer>
    )
}

export default NewsContent