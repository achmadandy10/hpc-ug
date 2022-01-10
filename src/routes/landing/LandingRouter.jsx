import About from "../../views/landing/about/About";
import AboutContent from "../../views/landing/about/content/AboutContent";
import NewsContent from "../../views/landing/news/content/NewsContent";
import News from "../../views/landing/news/News";
import SectionLanding from "../../views/landing/section/SectionLanding";
import Service from "../../views/landing/service/Service";
import ServiceContent from "../../views/landing/service/content/ServiceContent";
import Contact from "../../views/landing/contact/Contact";
import NewsCategory from "../../views/landing/news/category/NewsCategory";

export const LandingRouter = [
    { path: "/", exact: true, name: "Landing", component: SectionLanding },
    { path: "/tentang", exact: true, name: "Landing About", component: About },
    { path: "/tentang/:slug", exact: true, name: "Landing About Content", component: AboutContent },
    { path: "/layanan", exact: true, name: "Landing Service", component: Service },
    { path: "/layanan/:slug", exact: true, name: "Landing Service Content", component: ServiceContent },
    { path: "/berita", exact: true, name: "Landing News", component: News },
    { path: "/berita/view", exact: true, name: "Landing News Content", component: NewsContent },
    { path: "/berita/category", exact: true, name: "Landing News Category", component: NewsCategory },
    { path: "/kontak", exact: true, name: "Landing Contact", component: Contact },
]