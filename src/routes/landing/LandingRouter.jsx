import About from "../../views/landing/about/About";
import AboutContent from "../../views/landing/about/content/AboutContent";
import SectionLanding from "../../views/landing/section/SectionLanding";

export const LandingRouter = [
    { path: "/", exact: true, name: "Landing", component: SectionLanding },
    { path: "/tentang", exact: true, name: "Landing About", component: About },
    { path: "/tentang/:slug", exact: true, name: "Landing About Content", component: AboutContent },
]